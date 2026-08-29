---
title: "Demystifying DPoP in OAuth 2.0"
description: "How Proof-of-Possession tokens prevent replay attacks in modern APIs."
pubDate: 2026-08-20
tags: ["security", "backend", "oauth"]
---

Bearer tokens have a simple problem: whoever holds one can use it. If a token
leaks — through a logged request, a compromised proxy, a browser extension —
an attacker can replay it from anywhere, and the server has no way to tell
the difference.

DPoP (Demonstrating Proof-of-Possession) fixes this by binding an access
token to a key pair the client controls. Instead of just checking that a
token is valid, the server checks that the request was signed by the same
key that requested the token in the first place.

## The core mechanism

On every request, the client generates a short-lived signed JWT — a "DPoP
proof" — using a private key it holds. The proof includes the HTTP method,
the URL, and a timestamp:

```javascript
import { SignJWT, generateKeyPair, exportJWK } from "jose";

async function createDpopProof(method, url, privateKey, publicJwk) {
  return await new SignJWT({ htm: method, htu: url })
    .setProtectedHeader({ alg: "ES256", typ: "dpop+jwt", jwk: publicJwk })
    .setIssuedAt()
    .setJti(crypto.randomUUID())
    .sign(privateKey);
}
```

The server verifies the signature against the embedded public key, checks
the timestamp is recent, and confirms the token was issued to that exact
key. A stolen bearer token becomes useless without the private key it was
bound to.

## Where this actually matters

DPoP is most valuable in situations where tokens are more likely to leak:
single-page apps, mobile clients talking through untrusted networks, and
systems where access tokens pass through multiple internal services. It's
overhead you don't need for a simple server-to-server integration behind a
private network, but it closes a real gap for anything public-facing.

The trade-off is complexity: key management on the client, clock-skew
tolerance on the server, and a slightly heavier request. Worth it when the
threat model calls for it, not a default you should reach for everywhere.
