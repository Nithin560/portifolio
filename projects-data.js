/**
 * NITHIN VANDANA - PORTFOLIO DATA ARCHITECTURE
 * Structured metadata for projects, system architectures, skills, and timeline.
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Nithin Vandana",
    title: "Software Development Engineer / AI Systems Engineer",
    headline: "Building high-throughput backend services, async pipelines, and full-stack AI applications.",
    location: "Bangalore, Karnataka, India",
    email: "nithinvandana26@gmail.com",
    phone: "+91 9347388372",
    github: "https://github.com/Nithin560",
    linkedin: "https://www.linkedin.com/in/vandana-nithin-05b27628b",
    status: "Available for full-time SDE & AI Engineering roles",
    education: {
      degree: "Bachelor of Technology — Computer Science Engineering",
      college: "DVR & Dr. HS MIC College of Technology, Kanchikacherla",
      period: "2022 – 2026",
      cgpa: "8.2 / 10"
    },
    bio: [
      "I'm a Computer Science graduate based in Bangalore with a passion for designing scalable backend architectures, async data pipelines, and intelligent AI-powered products.",
      "My engineering philosophy revolves around three pillars: non-blocking concurrency (AsyncIO/HTTPX/Motor) for high throughput, strict data boundaries (Pydantic v2/SQLAlchemy) for zero-runtime surprises, and containerized Docker environments for reproducible production deployments.",
      "I don't just write scripts—I build production-grade platforms. From scraping 120+ ATS platforms daily with 98% deduplication in JobNexa, to deploying Intellica on a live college server supporting 200+ faculty and winning 2nd Prize at National Engineers' Day 2025, I focus on measurable impact and clean, maintainable code."
    ]
  },

  stats: [
    { label: "Daily Jobs Ingested", value: "1,000+", detail: "Scraped across 120+ ATS portals via AsyncIO" },
    { label: "Deduplication Rate", value: "98%", detail: "Content hashing & fuzzy matching pipeline" },
    { label: "Active Live Users", value: "200+", detail: "Faculty & HODs on college production server" },
    { label: "Turnaround Cut", value: "75%", detail: "Automated appraisal & research workflows" },
    { label: "Telemetry Uptime", value: "99.9%", detail: "Docker containerized production reliability" },
    { label: "Academic CGPA", value: "8.2/10", detail: "B.Tech in Computer Science Engineering" }
  ],

  projects: [
    {
      id: "jobnexa",
      title: "JobNexa – AI-Powered Job Intelligence Platform",
      period: "Aug 2026 – Oct 2026",
      tagline: "High-throughput async job aggregator processing 1,000+ daily listings with 98% deduplication across 120+ ATS portals.",
      badge: "Flagship Backend & AI Project",
      links: {
        github: "https://github.com/Nithin560/JobNexa",
        live: "https://github.com/Nithin560/JobNexa"
      },
      tags: ["Python", "FastAPI", "AsyncIO", "HTTPX", "PostgreSQL", "SQLAlchemy", "Pydantic v2", "React", "TypeScript", "Tailwind CSS", "Docker", "JWT", "NLP"],
      metrics: [
        { label: "Daily Listings", value: "1,000+" },
        { label: "ATS Portals Scraped", value: "120+" },
        { label: "Deduplication Rate", value: "98%" },
        { label: "Match Accuracy", value: "95%" },
        { label: "Telemetry Uptime", value: "99.9%" }
      ],
      overview: "Job seekers waste hours scrolling through fragmented, duplicate job postings across proprietary ATS platforms. JobNexa solves this with a distributed asynchronous ingestion pipeline that continuously monitors 120+ ATS job boards (Workday, Greenhouse, Lever, etc.), deduplicates job specs with 98% accuracy using cryptographic hashing and fuzzy matching, and delivers intelligent resume-job matching using NLP.",
      problem: "Traditional synchronous crawlers blocked worker threads, took hours to run, and flooded the database with duplicate listings across aggregators. The system required concurrent scraping, rate-limit resilience, strict schema validation, and sub-100ms API search latencies.",
      solution: "Engineered an asynchronous pipeline using Python AsyncIO and HTTPX with connection pooling and backoff jitter. Implemented a dual-phase deduplication strategy (SHA-256 canonical URL hash + NLP title/company fuzzy clustering) saving 98% redundant database writes. Built a FastAPI REST backend with Pydantic v2 models and connection-pooled SQLAlchemy on PostgreSQL. Containerized the entire stack with Docker, delivering 99.9% telemetry uptime.",
      architectureDiagram: [
        "┌────────────────────────────────────────────────────────┐",
        "│           120+ ATS Portals (Greenhouse, Lever, etc.)   │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│    Async Ingestion Engine (Python AsyncIO + HTTPX)    │",
        "│  - Connection pooling & automated rate-limit backoff  │",
        "│  - Concurrent page parsing with BeautifulSoup4        │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│      Dual-Phase Deduplication & NLP Matcher (98%)      │",
        "│  - Canonical URL SHA-256 hashing                       │",
        "│  - Fuzzy text clustering + NLP resume-to-job scoring   │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│     FastAPI Core Backend + Pydantic v2 Validation      │",
        "│  - Async REST endpoints, JWT auth, SMTP notifications  │",
        "│  - SQLAlchemy ORM with async PostgreSQL pooling        │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│      React.js + TypeScript Dashboard (Dockerized)      │",
        "│  - Real-time job telemetry, 99.9% uptime, filter views │",
        "└────────────────────────────────────────────────────────┘"
      ].join("\n"),
      highlights: [
        "Built automated ATS crawler handling 1,000+ daily listings across 120+ tech portals with non-blocking AsyncIO & HTTPX.",
        "Devised dual-stage deduplication algorithm achieving 98% accuracy, preventing duplicate recruiter alerts.",
        "Implemented FastAPI & PostgreSQL backend with SQLAlchemy ORM and Pydantic v2 serialization, maintaining 95% resume-match accuracy.",
        "Engineered React/TypeScript interface with live telemetry, containerized with multi-stage Docker builds maintaining 99.9% uptime."
      ]
    },

    {
      id: "intellica",
      title: "Intellica – Intelligent Research Insights Portal",
      period: "Jan 2026 – Apr 2026",
      tagline: "Academic research management portal deployed on a live college server, automating 18+ research categories for 200+ active faculty & HODs.",
      badge: "2nd Prize - National Engineers' Day 2025",
      links: {
        github: "https://github.com/Nithin560/Intellica",
        live: "https://github.com/Nithin560/Intellica"
      },
      tags: ["React.js", "Node.js", "Express", "MongoDB", "MERN Stack", "Docker", "RESTful APIs", "React Charts", "RBAC", "Git"],
      metrics: [
        { label: "Active Faculty/HODs", value: "200+" },
        { label: "Research Categories", value: "18+" },
        { label: "Turnaround Cut", value: "75%" },
        { label: "Approval Time Cut", value: "60%" },
        { label: "Awards", value: "2nd Prize" }
      ],
      overview: "College faculty appraisals and research publications (patents, journal papers, conferences, grants) were previously tracked manually via spreadsheets and physical paperwork, resulting in weeks of delays during NAAC/NBA accreditation. Intellica digitizes, validates, and tracks the entire institution's research output with real-time analytics and multi-tier RBAC approval workflows.",
      problem: "Faculty submissions required a hierarchical approval chain (Faculty -> Head of Department -> Principal/Dean -> Admin). Manual tracking led to lost documents, appraisal turnaround times exceeding 45 days, and impossible-to-audit compliance records across 18+ research categories.",
      solution: "Engineered a production-ready MERN platform with strict Role-Based Access Control (RBAC) and state-machine approval workflows. Automated 18+ distinct publication categories with custom MongoDB schema indexes and validation rules. Integrated interactive React visual charts for executive department analytics. Deployed on a live institutional server via Docker containers.",
      architectureDiagram: [
        "┌────────────────────────────────────────────────────────┐",
        "│           Multi-Tier Roles (Faculty, HOD, Admin)       │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│    React.js + Tailwind UI + React Charts Dashboard     │",
        "│  - Dynamic forms for 18+ research publication types    │",
        "│  - Real-time progress trackers & institutional audits  │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│         Node.js / Express Server-Side Engine           │",
        "│  - RBAC Middleware & State Machine Approval Workflow   │",
        "│  - Server-side payload validation & audit logging      │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│         MongoDB Indexed Datastore (Live Server)        │",
        "│  - Real-time document status & historical revisions    │",
        "│  - Aggregated department metrics for NAAC/NBA scoring  │",
        "└────────────────────────────────────────────────────────┘"
      ].join("\n"),
      highlights: [
        "Built and deployed on live college production server, automating 18+ research publication categories and cutting faculty appraisal turnaround by 75%.",
        "Implemented strict RBAC workflows for Faculty, HOD, and Admin roles with server-side state transitions, slashing manual approval latency by 60%.",
        "Structured performant MongoDB schemas with real-time status tracking, actively serving 200+ faculty and department leaders.",
        "Awarded 2nd Prize at Project Expo, National Engineers' Day 2025, and selected for presentation at College Technical Fest."
      ]
    },

    {
      id: "smart-diet",
      title: "Smart Diet – AI-Powered Fitness Platform",
      period: "Dec 2025 – Mar 2026",
      tagline: "Dynamic nutrition platform integrating Google Gemini LLM, real-time weather, and biometric metrics to generate contextual meal plans.",
      badge: "Google Gemini AI Integration",
      links: {
        github: "https://github.com/Nithin560/Smart-Diet",
        live: "https://github.com/Nithin560/Smart-Diet"
      },
      tags: ["Python", "FastAPI", "React.js", "Async MongoDB (Motor)", "Google Gemini API", "JWT", "OTP Authentication", "Tailwind CSS", "Docker", "CI/CD"],
      metrics: [
        { label: "Active Users", value: "500+" },
        { label: "Page Load Reduction", value: "40%" },
        { label: "Diet Adherence Boost", value: "30%" },
        { label: "Personalized Plans", value: "300+" },
        { label: "Deployment", value: "CI/CD" }
      ],
      overview: "Most nutrition apps provide static, one-size-fits-all meal plans that ignore daily environmental variables and real-world compliance barriers. Smart Diet leverages Google Gemini LLM combined with live biometric telemetry (BMI, metabolic rate, dietary restrictions) and local weather conditions (e.g. hydration suggestions in hot weather, calorie adjustments in cold) to produce achievable, real-time nutrition regimens.",
      problem: "Static calorie counters suffer from high churn because they don't adapt to user routines or environmental factors. In addition, synchronous database queries created unacceptable mobile page load delays.",
      solution: "Engineered an asynchronous backend combining FastAPI with Motor (async MongoDB driver), cutting page load time by 40%. Connected Google Gemini API using structured prompt-engineering pipelines with strict JSON schemas. Implemented secure JWT and OTP-based mobile authentication for 500+ users. Established automated CI/CD pipeline for frictionless updates.",
      architectureDiagram: [
        "┌────────────────────────────────────────────────────────┐",
        "│       User Telemetry: Biometrics + Geo-Location        │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│     React.js Client + JWT/OTP Secure Auth Gateway      │",
        "│  - Dynamic macro visualizers & mobile-first interface  │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│         FastAPI Asynchronous Backend Engine            │",
        "│  - Motor (Async MongoDB) non-blocking data layer       │",
        "│  - Weather API context injection service               │",
        "└───────────────────────────┬────────────────────────────┘",
        "                            ▼",
        "┌────────────────────────────────────────────────────────┐",
        "│        Google Gemini LLM Structured Reasoning          │",
        "│  - Prompt-chained diet generation with JSON schema     │",
        "│  - Biometric + Weather conditioned adherence logic     │",
        "└────────────────────────────────────────────────────────┘"
      ].join("\n"),
      highlights: [
        "Engineered React and FastAPI web app backed by asynchronous MongoDB (Motor) and secure JWT/OTP auth for 500+ users, reducing page load latency by 40%.",
        "Integrated Google Gemini LLM to synthesize personalized meal plans from user BMI, caloric goals, and live weather conditions, improving dietary adherence by 30%.",
        "Automated continuous integration and deployment with a GitHub Actions CI/CD pipeline and Docker containerization."
      ]
    }
  ],

  skills: {
    "Backend & Concurrency": [
      { name: "Python", level: "Advanced", desc: "AsyncIO, generators, multi-processing, HTTPX, system scripting" },
      { name: "FastAPI", level: "Advanced", desc: "Pydantic v2, async endpoints, dependency injection, middleware" },
      { name: "RESTful APIs", level: "Advanced", desc: "HTTP status specs, pagination, versioning, idempotent routes" },
      { name: "AsyncIO & HTTPX", level: "Advanced", desc: "Connection pooling, concurrent pipelines, non-blocking I/O" },
      { name: "Node.js & Express", level: "Proficient", desc: "Event loop, RESTful routers, JWT auth, middleware chaining" },
      { name: "JWT & OTP Auth", level: "Proficient", desc: "Token rotation, cryptographic salting, stateless verification" }
    ],
    "Frontend & UI": [
      { name: "React.js", level: "Advanced", desc: "Hooks, state machines, custom hooks, context, memoization" },
      { name: "TypeScript", level: "Proficient", desc: "Strict type checking, generics, interface contracts" },
      { name: "JavaScript (ES6+)", level: "Advanced", desc: "Promises, async/await, closures, DOM micro-interactions" },
      { name: "Tailwind CSS", level: "Advanced", desc: "Utility-first architecture, custom design tokens, dark mode" },
      { name: "HTML5 & CSS3", level: "Advanced", desc: "Semantic markup, CSS Grid, Flexbox, accessible ARIA, KaTeX" },
      { name: "Recharts & Charts", level: "Proficient", desc: "Interactive dashboards, real-time telemetry visualizers" }
    ],
    "AI & Data Engineering": [
      { name: "Google Gemini API", level: "Proficient", desc: "Prompt engineering, structured JSON outputs, context chaining" },
      { name: "LLM Integration", level: "Proficient", desc: "Retrieval augmentation, token budgeting, prompt templating" },
      { name: "Natural Language Processing (NLP)", level: "Proficient", desc: "Text normalization, fuzzy string similarity, TF-IDF" },
      { name: "Prompt Engineering", level: "Advanced", desc: "System persona priming, few-shot examples, JSON validation" }
    ],
    "Databases & ORM": [
      { name: "PostgreSQL", level: "Advanced", desc: "Relational modeling, indexing, foreign keys, query profiling" },
      { name: "MongoDB & Motor", level: "Advanced", desc: "Async aggregation pipelines, document indexing, schema design" },
      { name: "SQLAlchemy", level: "Proficient", desc: "Async engine sessions, relationship mapping, declarative models" },
      { name: "MySQL", level: "Proficient", desc: "ACID transactions, relational normalization, schema design" }
    ],
    "Cloud & DevOps": [
      { name: "Docker", level: "Proficient", desc: "Multi-stage builds, container isolation, compose orchestration" },
      { name: "GitHub Actions (CI/CD)", level: "Proficient", desc: "Automated test runs, build checks, deployment pipelines" },
      { name: "Render & Vercel", level: "Proficient", desc: "Edge CDN routing, zero-downtime serverless deployments" },
      { name: "Linux (Ubuntu)", level: "Proficient", desc: "Bash scripting, systemd service management, server hosting" },
      { name: "Git & GitHub", level: "Advanced", desc: "Feature branching, rebasing, code reviews, semantic tags" }
    ],
    "Core CS Principles": [
      { name: "Data Structures & Algorithms", level: "Solid", desc: "Complexity analysis, graphs, trees, dynamic programming" },
      { name: "Object-Oriented Programming (OOP)", level: "Solid", desc: "SOLID principles, encapsulation, polymorphism, design patterns" },
      { name: "Database Management Systems (DBMS)", level: "Solid", desc: "Indexing, normalization, B-trees, ACID compliance" },
      { name: "Computer Networks", level: "Solid", desc: "TCP/IP, HTTP/HTTPS, DNS, WebSockets, TLS handshake" }
    ]
  },

  experience: [
    {
      role: "Web Development Intern",
      company: "ExcelR Edtech Pvt. Ltd.",
      period: "Aug 2024 – Oct 2024",
      type: "Internship",
      details: [
        "Developed and maintained full-stack web application modules using modern JavaScript, React.js, and RESTful APIs.",
        "Refactored legacy UI components into reusable, responsive interfaces with modular CSS and state management.",
        "Collaborated with senior engineers on API integration, client-side caching, and load time optimization."
      ]
    },
    {
      role: "Data Science Master Virtual Intern",
      company: "AICTE – EduSkills (Altair)",
      period: "Oct 2024 – Dec 2024",
      type: "Virtual Internship",
      details: [
        "Executed exploratory data analysis (EDA), data cleaning pipelines, and statistical modeling on large-scale datasets.",
        "Constructed predictive machine learning models with feature extraction and evaluation metrics.",
        "Synthesized technical reports and visual dashboards to communicate model performance and insights."
      ]
    }
  ],

  certifications: [
    { name: "Python, JavaScript, Java, Prompt Engineering", issuer: "Infosys Springboard", year: "2024" },
    { name: "Data Analytics Certification", issuer: "Cisco Networking Academy", year: "2024" }
  ],

  achievements: [
    {
      title: "2nd Prize at Project Expo — National Engineers' Day 2025",
      detail: "Recognized among 100+ competing teams for engineering Intellica, the Intelligent Research Insights Portal deployed on live institutional infrastructure."
    },
    {
      title: "Selected Presenter at College Technical Fest",
      detail: "Delivered live technical demonstration and architectural walkthrough of Intellica's RBAC state-machine and research automation engine."
    }
  ],

  principles: [
    {
      title: "Async-First Concurrency",
      quote: "I/O should never block your CPU.",
      body: "When building crawlers or data ingestion engines (like JobNexa), synchronous requests cripple throughput. By embracing non-blocking event loops with AsyncIO, HTTPX, and Motor, we process thousands of requests concurrently on modest infrastructure."
    },
    {
      title: "Strict Data Contracts",
      quote: "Untyped dictionaries are bugs waiting to happen.",
      body: "Every external payload entering the system passes through strict Pydantic v2 schemas and validation boundaries. If data fails validation at the gateway, it never pollutes database layers or triggers silent failures downstream."
    },
    {
      title: "Production Realism",
      quote: "It doesn't count until it's running in production.",
      body: "I don't stop at 'works on my machine'. Everything I ship is containerized with multi-stage Docker builds, logged cleanly, guarded with RBAC and JWT authentication, and monitored for real uptime."
    },
    {
      title: "Pragmatic AI Usage",
      quote: "Use LLMs for reasoning, deterministic code for precision.",
      body: "I treat LLMs as specialized reasoning modules rather than magic bullets. In Smart Diet, Gemini handles contextual meal customization, while deterministic code calculates exact macros, calorie budgets, and validation."
    }
  ]
};
