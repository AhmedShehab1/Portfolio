---
title: "How I Fixed Local HTTPS with Raw OpenSSL (and Stopped Bypassing Certificate Errors)"
description: "Turn your development machine into a local Certificate Authority (CA) to get valid HTTPS on localhost without security bypasses."
pubDate: 2026-08-30
tags: ["security", "https", "openssl", "devops"]
---

We have all done it. You are working on a project locally over `http://localhost`, everything seems smooth, and then you hit a wall:

- You try to test the Web Crypto API, and the browser tells you it is only available in Secure Contexts.
- You need to test Service Workers, and the browser refuses to register them on an unencrypted site.
- You are debugging authentication cookies and need `SameSite=None; Secure`, but the browser silently drops them.
- You want to test HTTP/2 multiplexing, but browsers strictly require TLS.

For a long time, my quick fix was the "panic button": generate a quick self-signed certificate, see Chrome's red **Your connection is not private** warning screen, and bypass it. Then, when my backend or test scripts failed to talk to each other, I would add unsafe flags across my environment files: `verify=False` in Python, `NODE_TLS_REJECT_UNAUTHORIZED=0` in Node.js, or `curl -k`.

Every time I typed those flags, a quiet thought crossed my mind: *"One day, this workaround is going to accidentally reach production."*

I decided to stop fighting symptom after symptom and fix the root problem: I turned my development machine into a private Certificate Authority (CA).

Convenient tools like `mkcert` or reverse proxies like Caddy with automatic internal CAs exist, and they are great tools. But running through the raw OpenSSL commands yourself helps you understand how Public Key Infrastructure (PKI) really works. Once you understand what happens under the hood, a broken TLS handshake in Kubernetes, Docker, or a local service will never confuse you again.

## Why Self-Signed Certs Failed Me (and Why a Local CA Works)

When I first started fixing this, I wondered: *"Why can't I just self-sign a leaf certificate and move on?"*

The answer comes down to how operating systems handle trust. In a self-signed certificate, the Subject (who the certificate belongs to) and the Issuer (who signed it) are the exact same entity. Because your operating system's trust store does not know who you are, it marks the connection as untrusted and shows a warning. If you have five local projects, you would have to manually force your OS and browser to trust five different certificates.

In the real world, operating systems come with public Root CAs pre-installed. These root certificates sit in secure vaults and last for 10 to 25+ years. When an authority issues a certificate, trust flows down the chain:

```text
Root CA (in OS Trust Store)
└── Intermediate CA (optional)
    └── Your Server's Leaf Certificate
```

The solution is simple: create your own local Root CA, install it into your operating system's trust store once, and let all your local project certificates inherit trust from it.

## Step 1: Generating My Local Root CA

I started by creating a dedicated folder for my authority keys:

```bash
mkdir -p ca && cd ca
```

First, I generated the private key for my CA using standard 2048-bit RSA:

```bash
openssl genpkey -algorithm RSA -outform PEM -out ca_private_key.pem
```

> **Note:** When you view `ca_private_key.pem`, you only see `BEGIN PRIVATE KEY`. But mathematically, the public key comes directly from the private key seed. If you run `openssl pkey -in ca_private_key.pem -text -noout`, OpenSSL calculates and displays both the private data and the derived public key.

Next, I generated the Root CA certificate itself:

```bash
openssl req -x509 -new -key ca_private_key.pem \
  -days 3650 -out ca_cert.pem \
  -subj "/C=EG/ST=Cairo/L=Cairo/O=Ahmed Shehab/CN=Ahmed Shehab Local Root CA"
```

The key part here is the `-x509` flag. Normally, `openssl req` generates a CSR (Certificate Signing Request—an application to send to an external CA). Adding `-x509` tells OpenSSL to skip the CSR step, self-sign the certificate for 10 years (3,650 days), and include the root authority settings.

You can verify this by checking the decoded certificate:

```bash
openssl x509 -in ca_cert.pem -noout -text
```

Under `X509v3 extensions`, you will see:

```text
X509v3 Basic Constraints: critical
    CA:TRUE
```

Without `CA:TRUE`, an operating system will refuse to let this certificate validate downstream certificates.

## Step 2: Adding Trust to the Operating System

Having a CA certificate in a folder does nothing until your operating system trusts it as a root anchor.

On macOS, you can use the native `security` CLI to import `ca_cert.pem` into the system keychain:

```bash
sudo security add-trusted-cert -d -r trustRoot \
  -k "/Library/Keychains/System.keychain" ca_cert.pem
```

Here is what these flags mean:
- `-d`: Applies the trust rule to the system domain for all users.
- `-r trustRoot`: Explicitly marks the certificate as an authoritative Root CA.
- `-k "/Library/Keychains/System.keychain"`: Saves it in the system keychain so local browsers and background tools trust it.

*(On Linux, copy `ca_cert.pem` to `/usr/local/share/ca-certificates/` and run `sudo update-ca-certificates`. On Windows, import it into "Trusted Root Certification Authorities" via `certmgr.msc`.)*

## Step 3: Avoiding the Deprecated Common Name (The SAN Requirement)

With my Root CA trusted by the OS, the next step was creating a leaf certificate for my local development server.

Here is where I hit the first common issue. Older tutorials tell you to set `CN=localhost`. But RFC 2818 deprecated relying on the Common Name (CN) years ago. Modern browsers reject certificates that only have a Common Name with:

```text
NET::ERR_CERT_COMMON_NAME_INVALID
```

Browsers now require the **Subject Alternative Name (SAN)** extension.

Because OpenSSL's interactive prompt does not ask for SAN entries, create a configuration file named `server-cert.cnf`:

```ini
[ req ]
distinguished_name = req_distinguished_name
req_extensions = req_ext
prompt = no

[ req_distinguished_name ]
C = EG
ST = Cairo
L = Cairo
O = Ahmed Shehab
OU = Development
CN = localhost

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = localhost
DNS.2 = api.localhost
DNS.3 = app.local
IP.1 = 127.0.0.1
IP.2 = ::1
```

This configuration gives you full flexibility: you can add whatever local hostnames or loopback IPs your services need.

## Step 4: Issuing and Signing the Leaf Certificate

Now, back in the project root:

1. **Generate the server's private key:**

```bash
openssl genpkey -algorithm RSA -outform PEM -out server_key.pem
```

2. **Generate the CSR using your configuration file:**

```bash
openssl req -new -key server_key.pem -out server_csr.pem -config server-cert.cnf
```

The CSR only bundles your server's derived public key and metadata. Your private key stays safely on your machine.

3. **Sign the CSR with your Local CA:**

```bash
openssl x509 -req -in server_csr.pem \
  -CA ca/ca_cert.pem \
  -CAkey ca/ca_private_key.pem \
  -CAcreateserial \
  -out server_cert.pem \
  -days 365 \
  -sha256 \
  -extensions req_ext \
  -extfile server-cert.cnf
```

Passing `-extensions req_ext` and `-extfile server-cert.cnf` tells OpenSSL to copy the SAN definitions into the final `server_cert.pem`.

## Step 5: Verifying the Certificate

Once `server_cert.pem` was generated, I ran:

```bash
openssl verify server_cert.pem
```

And saw this error:

```text
C=EG, ST=Cairo, L=Cairo, O=Ahmed Shehab, OU=Development, CN=localhost
error 20 at 0 depth lookup: unable to get local issuer certificate
error server_cert.pem: verification failed
```

This happens because the standalone `openssl` CLI does not read the macOS Keychain; it only checks default system files (like `/etc/ssl/certs`).

To verify using OpenSSL directly, pass your CA file:

```bash
openssl verify -CAfile ca/ca_cert.pem server_cert.pem
```

Output:

```text
server_cert.pem: OK
```

To confirm that macOS trusts the certificate through the system keychain:

```bash
security verify-cert -c server_cert.pem
```

Output:

```text
...certificate verification successful.
```

## The Result

Seeing the green padlock on `https://localhost` without any insecure bypass flags is a great feeling.

Now, my local setup matches production behavior: Service Workers register cleanly, Web Crypto APIs work as expected, and zero insecure bypass flags are left in my code.

For a helpful visual guide on importing custom CAs into macOS Keychain and verifying local certificates, check out this video tutorial: [Create Your Own SSL Certificate Authority for Local HTTPS](https://www.youtube.com/watch?v=sR4_YISXNZE).
