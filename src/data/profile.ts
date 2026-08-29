// Single source of truth for hero, projects, experience, skills, and certifications.

export const SITE = {
  name: "Ahmed Shehab",
  role: "Software Engineer · Systems, Backend & Security",
  tagline:
    "Engineering high-throughput distributed backends, zero-trust security architectures, and resilient infrastructure.",
  location: "Cairo, Egypt",
  email: "ashehab.biomedeng@gmail.com",
  phone: "(+20) 1274316669",
  avatar: "/avatar.svg",
  social: {
    github: "https://github.com/AhmedShehab1",
    linkedin: "https://www.linkedin.com/in/ahmed-shehab-engineering/",
    leetcode: "https://leetcode.com/u/Ahmed_Abdelghafar/",
    resume: "https://flowcv.com/resume/gojsae0eve",
    x: "",
  },
  // Shown in the hero "status strip"
  status: "currently exploring distributed messaging & zero-trust architectures",
};

export type LogEntry = {
  date: string; // e.g. "Jul 2025 – Sep 2025"
  title: string;
  org: string;
  summary: string;
  tags?: string[];
  location?: string;
};

export type Project = {
  title: string;
  category: string;
  summary: string;
  highlights?: string[];
  tech: string[];
  link?: string;
  badge?: string;
};

export type SkillCategory = {
  name: string;
  items: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  url: string;
};

export const EXPERIENCE: LogEntry[] = [
  {
    date: "Jul 2025 – Sep 2025",
    title: "Backend Engineer Intern",
    org: "Suez Canal Bank",
    location: "Cairo, Egypt",
    summary:
      "Engineered scalable REST APIs using Java & Spring Boot, optimizing PostgreSQL query execution through custom database indexing. Integrated Prometheus and Grafana telemetry pipelines to conduct load/performance testing and analyze system bottlenecks under stress.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Prometheus", "Grafana", "Indexing"],
  },
  {
    date: "Nov 2024 – Mar 2025",
    title: "Backend Developer Intern",
    org: "Homains",
    location: "Remote",
    summary:
      "Implemented backend features and business logic using Frappe framework & Python, resolved critical bug fixes, authored comprehensive unit test suites, and managed automated CI/CD workflows via GitHub Actions.",
    tags: ["Python", "Frappe", "ERPNext", "CI/CD", "GitHub Actions", "Unit Testing"],
  },
  {
    date: "Jul 2023 – Jan 2025",
    title: "Software Engineering Trainee",
    org: "ALX Software Engineering Program — Holberton School",
    location: "Remote",
    summary:
      "Intensive, project-driven apprenticeship covering low-level C programming, algorithms & data structures, system design, RESTful APIs, relational & NoSQL databases, Docker containerization, CI/CD pipelines, and collaborative code reviews.",
    tags: ["C", "Python", "Data Structures", "Docker", "DevOps", "REST APIs", "TDD"],
  },
];

export const EDUCATION: LogEntry[] = [
  {
    date: "Cairo University",
    title: "B.Sc. in Systems and Biomedical Engineering",
    org: "Cairo University, Faculty of Engineering",
    summary:
      "Strong engineering foundation covering software architecture, control systems, signal processing, algorithms, and computational modeling.",
    tags: ["Engineering", "Algorithms", "Systems Design", "Signal Processing"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Open Source Contributor — zitadel/oidc",
    category: "Open Source / Core Auth",
    badge: "Merged in v3.49.4",
    summary:
      "Resolved a critical concurrency race condition in the certified zitadel/oidc Go SDK by isolating *http.Client redirect state handlers across token revocation and session-termination routines.",
    tech: ["Go", "OpenID Connect", "OAuth 2.0", "Concurrency", "HTTP"],
    link: "https://github.com/zitadel/oidc",
  },
  {
    title: "WasteWarriors",
    category: "Distributed Systems / Event-Driven",
    badge: "DDD & CQRS",
    summary:
      "Engineered a food waste reduction backend applying strict Domain-Driven Design (DDD) and CQRS/Event Sourcing architecture. Implemented the Transactional Outbox pattern with a background message relay for reliable event publishing to RabbitMQ without distributed locks.",
    tech: ["TypeScript", "DDD", "CQRS", "Event Sourcing", "RabbitMQ", "Outbox Pattern", "Integration Testing"],
    link: "https://github.com/AhmedShehab1/WasteWarriors",
  },
  {
    title: "Zero-Trust API Gateway",
    category: "Security & Identity Architecture",
    badge: "Zero-Trust",
    summary:
      "Engineered a hardened API security gateway featuring cryptographic request validation, OIDC step-up authentication, and an active replay cache. Hardened auth flows using DPoP and PKCE algorithms coupled with dynamic RBAC/ABAC authorization models.",
    tech: ["OIDC", "DPoP", "PKCE", "RBAC/ABAC", "Cryptography", "Security", "Replay Cache"],
  },
  {
    title: "Distributed Threat Intelligence Pipeline (Project Aegis)",
    category: "High-Performance Data Engine",
    badge: "Hybrid Concurrency",
    summary:
      "Engineered a hybrid-concurrent stream data engine using a 'Process per Core, Async per Process' architecture. Bypassed GIL bottlenecks and eliminated IPC overhead via stream partitioning and shared-memory lock-free monitoring.",
    tech: ["Python", "AsyncIO", "Multiprocessing", "Shared Memory", "Lock-Free IPC", "Telemetry"],
    link: "https://github.com/AhmedShehab1/asyncio-hybrid-worker-pool",
  },
  {
    title: "FastAPI Bidding Service",
    category: "Real-Time Systems",
    badge: "Real-Time WebSockets",
    summary:
      "Real-time e-commerce bidding backend with distributed WebSocket broadcasting over Redis Pub/Sub, a synchronous-to-async bridge for concurrent fraud detection, and a containerized automated testing pipeline.",
    tech: ["FastAPI", "Redis Pub/Sub", "WebSockets", "PostgreSQL", "Docker", "Pytest"],
  },
  {
    title: "Raseel Clinical Web App",
    category: "Full-Stack / Healthcare",
    badge: "Search Latency -40%",
    summary:
      "Built an RBAC-based clinical appointment management system using Flask, Elasticsearch, and MySQL with mobile-first MVT architecture. Accelerated medical record search latency by ~40%.",
    tech: ["Flask", "Elasticsearch", "MySQL", "RBAC", "REST APIs", "Python"],
  },
  {
    title: "Automated Clinical Specialty Classification",
    category: "Clinical NLP & Machine Learning",
    badge: "Biomedical NLP",
    summary:
      "Built a negation-aware clinical NLP preprocessing pipeline (spaCy/SciSpaCy + UMLS) that de-identifies sensitive patterns, normalizes medical transcriptions, and extracts structured biomedical entity features.",
    tech: ["Python", "spaCy", "SciSpaCy", "UMLS", "NLP", "Feature Engineering"],
    link: "https://github.com/AhmedShehab1/automated_medical_specialty_classification_from_clinical_notes",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Programming Languages",
    items: ["C", "Python", "JavaScript", "Java", "Go", "TypeScript", "SQL", "Shell"],
  },
  {
    name: "Frameworks & Backend",
    items: ["Spring Boot", "FastAPI", "Flask", "Django", "Frappe", "Express", "React", "Astro"],
  },
  {
    name: "Databases & Message Brokers",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "RabbitMQ", "Elasticsearch"],
  },
  {
    name: "DevOps & Observability",
    items: ["Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Prometheus", "Grafana", "DataDog", "HAProxy", "NGINX"],
  },
  {
    name: "Cloud, Tools & Methodologies",
    items: ["AWS", "Git / GitHub", "Domain-Driven Design (DDD)", "CQRS", "RESTful APIs", "TDD & Unit Testing", "Agile / Scrum"],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Meta Backend Developer Professional Certificate",
    issuer: "Meta (Credly)",
    url: "https://www.credly.com/badges/db89b0a3-66dc-4cb9-aeae-66a3725e3851/public_url",
  },
  {
    title: "ALX Software Engineering Certificate",
    issuer: "ALX / Holberton School",
    url: "https://intranet.alxswe.com/certificates/8SBYCNrR62",
  },
  {
    title: "SQL Professional Certificate",
    issuer: "HackerRank",
    url: "https://www.hackerrank.com/certificates/iframe/77fdb3d73711",
  },
  {
    title: "Software Architecture for Big Data (L2)",
    issuer: "Coursera",
    url: "https://www.coursera.org//account/accomplishments/badge/CR5-G24_QxSefhtuPzMU-Q",
  },
  {
    title: "Embedded Systems Diploma",
    issuer: "Engineering Faculty",
    url: "https://drive.google.com/file/d/1MgjMwwcNSw3qeGrk2-66ipKICEntr9UE/view?usp=drive_link",
  },
];
