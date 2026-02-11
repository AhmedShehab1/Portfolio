// ── Portfolio Data Constants ────────────────────────────────────────────────
// Structured from CV — branded as Software Engineer / Backend Specialist

export const PROFILE = {
  name: "Ahmed Shehab",
  title: "Software Engineer — Backend & Systems Specialist",
  email: "ashehab.biomedeng@gmail.com",
  phone: "(+20) 1274316669",
  links: {
    linkedin: "https://linkedin.com/in/ahmed-shehab-engineering",
    github: "https://github.com/AhmedShehab1",
    leetcode: "https://leetcode.com/u/Ahmed_Abdelghafar/",
    portfolio: "https://portfolio.shehabtech.me/",
  },
  education: {
    degree: "B.S. in Biomedical Engineering",
    institution: "Cairo University",
  },
  bootIntro: [
    "$ ssh ahmed@portfolio.sys",
    "Authenticating... ✓",
    "Loading profile...",
    "",
    "┌─────────────────────────────────────────────┐",
    "│  AHMED SHEHAB — Backend & Systems Engineer  │",
    "│  Uptime: 3+ years  |  Status: ONLINE        │",
    "│  Specialization: Distributed Systems,       │",
    "│  Concurrency, High-Performance APIs         │",
    "└─────────────────────────────────────────────┘",
    "",
    "$ cat /etc/motd",
    "→ Building resilient systems, one microservice at a time.",
    "→ Type 'help' or scroll to explore.",
  ],
};

// ── Dependencies (Skills) ──────────────────────────────────────────────────

export interface Dependency {
  category: string;
  items: string[];
  icon: string; // lucide icon name
}

export const DEPENDENCIES: Dependency[] = [
  {
    category: "Languages",
    items: ["C", "Python", "JavaScript", "TypeScript", "Java"],
    icon: "code-2",
  },
  {
    category: "Frameworks",
    items: [
      "Django",
      "Flask",
      "Frappe",
      "Express",
      "Spring Boot",
      "React",
      "FastAPI",
      "Bull",
    ],
    icon: "layers",
  },
  {
    category: "Databases & Tools",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "Git",
      "Docker",
    ],
    icon: "database",
  },
  {
    category: "DevOps & Monitoring",
    items: [
      "Nginx",
      "Gunicorn",
      "HAProxy",
      "DataDog",
      "Prometheus",
      "Grafana",
      "CI/CD",
      "GitHub Actions",
    ],
    icon: "server",
  },
  {
    category: "Architecture",
    items: [
      "REST APIs",
      "Unit Testing",
      "TDD",
      "Agile",
      "Microservices",
      "System Design",
    ],
    icon: "cpu",
  },
];

// ── Runtime History (Professional Experience) ──────────────────────────────

export interface RuntimeEntry {
  role: string;
  org: string;
  location: string;
  period: string;
  highlights: string[];
  status: "terminated" | "running" | "completed";
}

export const RUNTIME_HISTORY: RuntimeEntry[] = [
  {
    role: "Backend Engineer Intern",
    org: "Suez Canal Bank",
    location: "Cairo, Egypt",
    period: "Jul 2025 – Sep 2025",
    highlights: [
      "Spring Boot · Java · PostgreSQL — built high-throughput banking APIs.",
      "Implemented DB indexing strategies improving query performance.",
      "Integrated Prometheus + Grafana for real-time system monitoring.",
      "Conducted performance & scalability testing on critical endpoints.",
    ],
    status: "completed",
  },
  {
    role: "Backend Developer Intern",
    org: "Homains",
    location: "Remote",
    period: "Nov 2024 – Mar 2025",
    highlights: [
      "Frappe / Python on ERPNext — feature implementation & bug fixes.",
      "Wrote unit tests and integrated CI/CD via GitHub Actions.",
      "Contributed to production-grade ERP system reliability.",
    ],
    status: "completed",
  },
  {
    role: "Full-Stack Developer",
    org: "Raseel Medical Center",
    location: "Riyadh, Saudi Arabia",
    period: "2024",
    highlights: [
      "Flask + Elasticsearch + MySQL — clinical appointment system.",
      "Designed RBAC-based auth & mobile-first MVT architecture.",
      "Integrated Elasticsearch search (≈40% faster response).",
      "Maintained session security, API design & code maintainability.",
    ],
    status: "completed",
  },
  {
    role: "Software Engineering Program",
    org: "ALX / Holberton School",
    location: "Online",
    period: "Jul 2023 – Jan 2025",
    highlights: [
      "Intensive project-driven program: algorithms, data structures, system design.",
      "RESTful APIs, relational & NoSQL databases, testing & TDD.",
      "Containerization (Docker), CI/CD, monitoring & debugging.",
      "Collaborative code reviews and production-focused deliverables.",
    ],
    status: "completed",
  },
];

// ── Service Registry (Projects) ────────────────────────────────────────────

export interface Service {
  name: string;
  description: string;
  tech: string[];
  status: "online" | "maintenance" | "archived";
  uptime: string;
  repo?: string;
  category: "backend" | "fullstack" | "systems" | "tools";
}

export const SERVICES: Service[] = [
  {
    name: "Signal Equalizer",
    description:
      "Full-stack signal processing platform — STFT-based frequency equalization, real-time spectrum/spectrogram visualizations, AI source separation (Hybrid Demucs, DPRNN), Web Audio API.",
    tech: ["React", "TypeScript", "FastAPI", "Python", "DSP", "AI/ML"],
    status: "online",
    uptime: "99.8%",
    category: "fullstack",
  },
  {
    name: "Computational Wave Lab",
    description:
      "High-performance DSP toolkit — real-time FFT/IFFT, phased array beamforming, Web Workers for multi-threaded computation, OffscreenCanvas rendering.",
    tech: [
      "React",
      "TypeScript",
      "Web Workers",
      "DSP",
      "OffscreenCanvas",
      "OOP",
    ],
    status: "online",
    uptime: "99.5%",
    category: "systems",
  },
  {
    name: "Signal Viewer",
    description:
      "Multi-domain signal analysis platform with real-time visualization, AI-driven classification & abnormality detection (TensorFlow), multi-view playback.",
    tech: ["React", "TensorFlow", "Signal Processing", "Real-time Viz"],
    status: "online",
    uptime: "99.2%",
    category: "fullstack",
  },
  {
    name: "Redis Clone",
    description:
      "In-memory key-value store built from scratch — PING, ECHO, SET/GET, CONFIG, OOP architecture, RDB persistence (planned), replication (planned).",
    tech: ["Python", "OOP", "Networking", "Data Structures"],
    status: "online",
    uptime: "98.7%",
    category: "systems",
  },
  {
    name: "LittleLemon Restaurant",
    description:
      "Production-grade REST API with authentication, menu management, reservation system, Swagger docs, Dockerized deployment.",
    tech: ["Django", "DRF", "Djoser", "Swagger", "Docker"],
    status: "online",
    uptime: "99.9%",
    category: "backend",
  },
  {
    name: "File Manager API",
    description:
      "Secure file management service — JWT auth, file upload/download, image processing pipeline, Redis caching layer.",
    tech: ["Node.js", "MongoDB", "Redis", "Express"],
    status: "online",
    uptime: "99.4%",
    category: "backend",
  },
  {
    name: "AdFriend Extension",
    description:
      "Chrome extension that replaces ads with inspirational quotes — MutationObserver-based DOM scanning, Chrome Extension APIs.",
    tech: ["JavaScript", "Chrome APIs", "MutationObserver", "HTML/CSS"],
    status: "online",
    uptime: "97.5%",
    category: "tools",
  },
  {
    name: "Smart Home Controller",
    description:
      "Embedded systems project — Atmega32 + Bluetooth smart-home control: lighting, security, sensor integration (LDR, LM35), PWM motor control, timer automation.",
    tech: ["C", "Atmega32", "Bluetooth", "PWM", "Embedded"],
    status: "archived",
    uptime: "N/A",
    category: "systems",
  },
];

// ── Certifications ─────────────────────────────────────────────────────────

export const CERTIFICATIONS = [
  "ALX Software Engineering Certificate",
  "Meta Backend Developer Professional Certificate",
  "MongoDB Certified Developer",
  "SQL Professional Certificate",
  "Embedded Systems Diploma",
  "Software Architecture for Big Data (L2)",
  "English Certificate — EF SET",
];

// ── Nav / Command Palette Items ────────────────────────────────────────────

export interface CommandItem {
  label: string;
  shortcut: string;
  action: string; // url or section id
  icon: string;
}

export const COMMANDS: CommandItem[] = [
  { label: "Go to GitHub", shortcut: "⌘ G", action: PROFILE.links.github, icon: "github" },
  { label: "Go to LinkedIn", shortcut: "⌘ L", action: PROFILE.links.linkedin, icon: "linkedin" },
  { label: "Go to LeetCode", shortcut: "⌘ K", action: PROFILE.links.leetcode, icon: "code-2" },
  { label: "Send Email", shortcut: "⌘ E", action: `mailto:${PROFILE.email}`, icon: "mail" },
  { label: "Jump to Services", shortcut: "⌘ S", action: "#services", icon: "server" },
  { label: "Jump to Runtime History", shortcut: "⌘ R", action: "#runtime", icon: "terminal" },
  { label: "Jump to Dependencies", shortcut: "⌘ D", action: "#dependencies", icon: "package" },
];
