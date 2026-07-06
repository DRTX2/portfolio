import type { Technology, Link } from '../components/ProjectCard.astro';

export interface ProjectData {
  slug: string;
  title: string;
  image: string;
  images?: string[];
  description: string; // Used for short intro or HTML content
  highlights?: { label: string; text: string }[]; // New: For the bullet points on the card
  technologies: Technology[];
  links: Link[];
  // Extended details for Modal
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  videoUrl?: string; // Optional YouTube video URL
}

export const projects: ProjectData[] = [
  {
    slug: 'stayflow-cloud',
    title: 'StayFlow Cloud — Multi-Tenant Hotel SaaS',
    image: `${import.meta.env.BASE_URL}assets/img/stay-flow/dashboard.png`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/stay-flow/dashboard.png`,
      `${import.meta.env.BASE_URL}assets/img/stay-flow/rooms.png`,
      `${import.meta.env.BASE_URL}assets/img/stay-flow/integrations.png`,
    ],
    description: `A production-grade, multi-tenant cloud SaaS platform for hotel management — reservations, front desk, billing, housekeeping, analytics, and guest portal — deployed on Azure Container Apps.`,
    highlights: [
      { label: 'Multi-tenant', text: 'Full row-level tenant isolation with <strong>EF Core global query filters</strong> and claims-based tenancy.' },
      { label: 'OIDC Auth', text: '<strong>OpenIddict Authorization Code + PKCE</strong> flow with a Next.js BFF, httpOnly session cookies and token refresh.' },
      { label: 'Azure Cloud', text: 'Deployed on <strong>Azure Container Apps</strong> with ACR, Bicep IaC, and Neon serverless PostgreSQL.' }
    ],
    technologies: [
      { name: 'ASP.NET Core 9', iconClass: 'devicon-dot-net-original' },
      { name: 'Next.js 16', iconClass: 'devicon-nextjs-original' },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
      { name: 'OpenIddict', iconImg: 'https://cdn.simpleicons.org/openid' },
      { name: 'EF Core 9', iconClass: 'devicon-dot-net-original' },
      { name: 'Azure', iconClass: 'devicon-azure-plain' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
      { name: 'MediatR (CQRS)', iconClass: 'devicon-dot-net-original' },
      { name: 'Hangfire', iconImg: 'https://cdn.simpleicons.org/clockify' },
      { name: 'MassTransit', iconImg: 'https://cdn.simpleicons.org/rabbitmq' },
      { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-original' },
    ],
    links: [
      {
        url: 'https://stayflow-prod-web.purplebay-4e22b9c6.westus3.azurecontainerapps.io',
        label: 'Live App',
        iconClass: 'fas fa-external-link-alt live-pulse-icon',
      },
      {
        url: 'https://github.com/DRTX2/stay-flow-cloud',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: `StayFlow Cloud is a production-grade multi-tenant SaaS platform for hotel and accommodation management. Built with a clean separation between a Next.js 16 BFF frontend and an ASP.NET Core 9 REST API with OpenIddict as the embedded OIDC server.

The platform handles the full hotel operations lifecycle: reservations with check-in/check-out flows, room and room-type management, guest 360 profiles, invoice generation with line items and taxes, housekeeping task assignment, maintenance requests, in-stay service orders, staff management with fine-grained permissions, analytics dashboards, document storage, and multi-language support.

Multi-tenancy is enforced at the database row level using EF Core global query filters and an ITenantProvider that reads the tenant from authenticated JWT claims — no manual WHERE clauses needed. Authentication uses OpenIddict's Authorization Code + PKCE flow: the Next.js BFF handles the PKCE handshake, stores tokens in httpOnly cookies, and refreshes them transparently via Edge Middleware.

The application is deployed on Azure Container Apps with images stored in Azure Container Registry, infrastructure defined as code in Azure Bicep, and the database hosted on Neon serverless PostgreSQL.`,
    features: [
      'Multi-tenant hotel management with complete row-level data isolation per tenant.',
      'Reservations: full lifecycle (Pending → Confirmed → CheckedIn → CheckedOut), room assignment, confirmation codes.',
      'Billing: invoice generation, line items, taxes, payment recording, and PDF export.',
      'Housekeeping: automatic task creation on checkout, staff assignment, status tracking.',
      'Guest Portal: self-service profile, stay history, and document uploads.',
      'Analytics: occupancy rates, revenue dashboards, and CSV/Excel report export.',
      'OpenIddict OIDC server with Authorization Code + PKCE — no third-party auth service dependency.',
      'Next.js BFF with httpOnly cookie session, Edge Middleware token refresh, and SSR data fetching.',
      'CQRS with MediatR, domain events with MassTransit, and Hangfire background jobs.',
      'Deployed on Azure Container Apps via Azure Bicep IaC and GitHub Actions CI/CD.',
    ],
    challenges: [
      'Implementing a secure multi-tenant architecture that guarantees data isolation without leaking tenant data across requests.',
      'Building a full embedded OIDC server (OpenIddict) integrated with ASP.NET Identity and a Next.js BFF doing PKCE flow with httpOnly cookies.',
      'Solving URL configuration issues between the API (OpenIddict redirects) and the BFF (auth callbacks) in Azure Container Apps — where env vars injected at runtime vs. build time behave differently.',
      'Designing a clean domain model with CQRS and domain events while keeping MediatR handlers readable and testable.',
    ],
    solutions: [
      'Used EF Core global query filters and a scoped ITenantProvider to automatically scope every query to the current tenant without any per-query code.',
      'Configured OpenIddict with Authorization Code + PKCE, built PKCE verifier/challenge generation in the Next.js BFF, and stored all tokens in httpOnly cookies with transparent Edge Middleware refresh.',
      'Fixed production URL mismatches by introducing Authentication:FrontendLoginUrl config in the API, using logical-OR (||) fallbacks in Next.js to handle empty Docker build args, and updating the AccountController to redirect using the configured URL rather than hardcoded localhost.',
      'Modeled the domain with aggregates, domain events published via MassTransit loopback, and Hangfire for background jobs like email notifications and invoice PDF generation.',
    ],
  },
  {

    slug: 'petsafe',
    title: 'PetSafe — Veterinary Clinic Management',
    image: `${import.meta.env.BASE_URL}assets/img/petsafe.webp`,
    description: `A full-stack platform to run a veterinary clinic end to end — owners and pets, appointments, a live queue, medical encounters, vaccinations and adoptions.`,
    highlights: [
      { label: 'Clean architecture', text: 'Domain, application, infrastructure and presentation kept apart.' },
      { label: 'Real time', text: 'Live waiting queue and alerts over WebSockets.' },
      { label: 'Clinical core', text: 'Records with attachments, drafts, follow-ups and vaccinations.' }
    ],
    technologies: [
      { name: 'NestJS', iconClass: 'devicon-nestjs-plain' },
      { name: 'Angular', iconClass: 'devicon-angularjs-plain' },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
      { name: 'Playwright', iconImg: 'https://cdn.simpleicons.org/playwright' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
    ],
    links: [
      {
        url: 'https://github.com/STRATIUM-UTA/PetSafe-Back',
        label: 'Backend',
        iconClass: 'fab fa-github',
      },
      {
        url: 'https://github.com/STRATIUM-UTA/PetSafe-Front',
        label: 'Frontend',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: `PetSafe is a full-stack platform to run a veterinary clinic end to end: owners and their pets, appointments and the daily queue, medical encounters, vaccinations and even adoptions. It pairs a NestJS backend with an Angular frontend.
The platform centralizes every flow behind a single API. A NestJS backend organized in clean, separate layers, exposes a documented REST API over PostgreSQL with TypeORM, while an Angular interface turns it into the screens the clinic actually uses. Access is protected with JWT and email-based password recovery.
The backend is NestJS with TypeScript in a hexagonal architecture, WebSockets for real-time queue and notifications, SMTP email and an OpenAPI specification. The whole stack is containerized with Docker and shipped through a CI/CD pipeline to a VPS.`,
    features: [
      "Clinical core: Encounters & vaccines with attachments, drafts, follow-ups and a QR code for each pet.",
      "Appointments: Requests, scheduling, live queue and no-show handling kept in sync via WebSockets.",
      "Clean architecture: Layered backend keeping domain, application, infrastructure and presentation apart.",
      "Adoptions: An adoption workflow alongside the clinical side.",
      "Secure auth: Token security with JWT and email-based password reset."
    ],
    challenges: [
      "Running a clinic end to end efficiently handling both medical encounters and daily operations.",
      "Keeping real-time synchronization between appointment requests, live waiting queue, and notifications."
    ],
    solutions: [
      "Built a full-stack system with a centralized NestJS REST API and Angular frontend.",
      "Integrated WebSockets to synchronize the live waiting queue and notifications across connected clients.",
      "Containerized everything with Docker and deployed to a VPS with CI/CD and Playwright system tests."
    ]
  },
  {
    slug: 'iron-zone',
    title: 'Iron Zone — Gym Management on Odoo',
    image: `${import.meta.env.BASE_URL}assets/img/ironzone.webp`,
    description: `A customized Odoo 18 platform that brings a gym's website, online store, memberships, classes and billing together into one modular business system.`,
    highlights: [
      { label: 'Custom addons', text: 'Six Iron Zone modules and five invoicing and localization addons.' },
      { label: 'Plans', text: 'Memberships and periodic invoicing through custom subscriptions.' },
      { label: 'Store + portal', text: 'Public shop, checkout and a client portal for orders and invoices.' }
    ],
    technologies: [
      { name: 'Odoo 18', iconImg: 'https://cdn.simpleicons.org/odoo' },
      { name: 'Python', iconClass: 'devicon-python-plain' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
    ],
    links: [
      {
        url: 'https://iron-zone.stratiumhub.com',
        label: 'Live App',
        iconClass: 'fas fa-external-link-alt live-pulse-icon',
      },
      {
        url: 'https://github.com/JoelBonillaG/iron_zone_odoo_das',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: `Iron Zone is an end-to-end management platform for a gym and sports center, built as a customized Odoo 18 solution. It pulls the public website, the online store, memberships, classes and billing into a single system instead of a pile of disconnected tools.
Native apps for website, online store, sales, inventory, events and accounting are extended with custom addons, so visitors browse plans and products, subscribe from the shop, and each order turns into recurring billing and a valid electronic invoice.
Behind the storefront, custom modules model memberships and subscriptions, an exercise guide catalog with machines and categories, an inventory layer, a task dashboard and a refreshed backend theme, while customers, trainers, events, sales orders and invoices are managed from clean administrative views with role based permissions.`,
    features: [
      "11 Custom addons: Six Iron Zone modules and five invoicing and localization addons.",
      "Modular Architecture: Website, store, subscriptions, inventory, tasks and guides.",
      "Recurring billing: Memberships and periodic invoicing through custom subscriptions.",
      "Online sales: Public shop, checkout and a client portal for orders and invoices.",
      "Access control: Visitor, portal client, trainer and administrator permissions.",
      "Electronic invoicing: Electronic vouchers, signing, withholdings and tax reports."
    ],
    challenges: [
      "Juggling recurring memberships and payments, a product catalog, class bookings, training content, invoicing and local tax duties with disconnected tools."
    ],
    solutions: [
      "Built a single Odoo 18 platform whose modular structure is adapted to a specific gym workflow.",
      "Packaged with Docker Compose, backed by PostgreSQL 15, with automated checks on every change through CI pipelines.",
      "Implemented Stripe for payments, Playwright for end to end flows."
    ]
  },
  {
    slug: 'n8n-scrumban-bot',
    title: 'AI Project Manager Bot — n8n Scrumban Automation',
    image: `${import.meta.env.BASE_URL}assets/img/chat-discord-petsafe-workflow.png`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/chat-discord-petsafe-workflow.png`,
      `${import.meta.env.BASE_URL}assets/img/n8n-bot.svg`
    ],
    description: `Self-hosted n8n bot acting as an AI Project Manager for a Scrumban methodology, orchestrating Discord, Trello, GitHub, and email.`,
    highlights: [
      { label: 'Role', text: 'Acts as an <strong>AI Project Manager</strong> for Scrumban: tasks, blockers, rework, meetings, deliverables, and retrospectives.' },
      { label: 'AI Insight', text: 'Reads commits & PRs and explains changes in <strong>non-technical language</strong>, flags technical debt and bad practices with actionable recommendations.' },
      { label: 'Integrations', text: 'Discord (chat & meetings), Trello board, GitHub (backend/frontend), email alerts, plus a web page to <strong>approve/deny PRs</strong>.' }
    ],
    technologies: [
      { name: 'n8n', iconImg: 'https://cdn.simpleicons.org/n8n' },
      { name: 'Gemini', iconImg: 'https://cdn.simpleicons.org/googlegemini' },
      { name: 'Discord', iconClass: 'fab fa-discord' },
      { name: 'Trello', iconClass: 'fab fa-trello' },
      { name: 'GitHub', iconClass: 'fab fa-github' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
      { name: 'Ubuntu Server', iconClass: 'devicon-ubuntu-plain' },
    ],
    links: [
      {
        // TODO: replace with the real repository URL
        url: 'https://github.com/DRTX2/n8n-scrumban-bot',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
      {
        // TODO: replace with the real VPS deployment URL
        url: 'https://example.com',
        label: 'Live App',
        iconClass: 'fas fa-external-link-alt live-pulse-icon',
      },
    ],
    detailedDescription: `A self-hosted n8n automation deployed on an Ubuntu Server VPS that takes the role of a Project Manager
    for a team working with a Scrumban methodology. The bot integrates AI APIs (Google Gemini / OpenAI) to manage the full
    project lifecycle: task management, custom reports, blockers, rework tracking, meeting coordination, alerts, deliverables,
    progress tracking, error handling, logs, and retrospectives. It connects Discord (meetings and conversational bot chat),
    a Trello board, GitHub repositories (backend and frontend), and email notifications. It also exposes a web page to
    approve or deny pull requests: the bot reads the commits and PR diffs, understands the context of what changed, and
    explains it in non-technical language, including recommendations. On top of that, it continuously watches over technical
    debt and bad practices in the project, explaining the problems and proposing solutions in a way the whole organization can understand.`,
    features: [
      'Scrumban lifecycle management: tasks, blockers, rework, deliverables, progress, and retrospectives.',
      'Conversational bot in Discord plus automated meeting coordination and alerts.',
      'Custom reports and email notifications for stakeholders.',
      'PR approval/denial web page with AI-generated, non-technical summaries of every change.',
      'Technical debt and bad-practice monitoring with explained recommendations and solutions.',
      'Centralized error handling and logging across all workflows.'
    ],
    challenges: [
      "Translating raw commits and PR diffs into clear, non-technical explanations that any stakeholder can understand.",
      "Orchestrating many external services (Discord, Trello, GitHub, email, AI APIs) reliably in a single self-hosted instance.",
      "Detecting technical debt and bad practices automatically while keeping recommendations actionable and explainable.",
      "Keeping the Scrumban flow (tasks, blockers, rework, retrospectives) consistent across all integrated tools."
    ],
    solutions: [
      "Built AI pipelines with Gemini/OpenAI that read commit and PR context to generate plain-language summaries and change recommendations.",
      "Designed modular n8n workflows with centralized error handling and logging, self-hosted with Docker on an Ubuntu Server VPS.",
      "Implemented a PR review web page where approvals/denials are informed by the AI's contextual analysis of each change.",
      "Synchronized Trello, GitHub, and Discord through event-driven workflows, with email alerts for reports, meetings, and deliverables."
    ]
  },
  {
    slug: 'gasoline-system',
    title: 'Fleet & Driver Management Platform',
    image: `${import.meta.env.BASE_URL}assets/img/gasoline-system.png`,
    description: `Distributed microservices platform for managing drivers, vehicles, and operations.`,
    highlights: [
      { label: 'Architecture', text: 'Distributed microservices with NestJS, RabbitMQ, and gRPC.' },
      { label: 'Performance', text: 'Real-time GPS tracking and reporting for fleet operations.' },
      { label: 'Infrastructure', text: 'Dockerized environment with Eureka Service Discovery.' }
    ],
    technologies: [
      { name: 'NestJS', iconClass: 'devicon-nestjs-plain' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
      { name: 'RabbitMQ', iconClass: 'devicon-rabbitmq-original' },
      { name: 'gRPC', iconClass: 'devicon-grpc-plain' },
      { name: 'Kubernetes', iconClass: 'devicon-kubernetes-plain' },
      { name: 'Elasticsearch', iconClass: 'devicon-elasticsearch-plain' },
      { name: 'Kibana', iconClass: 'devicon-kibana-plain' },
      { name: 'Swagger', iconClass: 'devicon-swagger-plain' },
      { name: 'React', iconClass: 'devicon-react-original' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
    ],
    links: [
      {
        url: 'https://github.com/DavidJosueP2/Distributed-Gasoline-System',
        label: 'Backend Source Code',
        iconClass: 'fab fa-github',
      },
      {
        url: 'https://github.com/JoelBonillaG/Distributed-Gasoline-System-Frontend',
        label: 'Frontend Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: `This project was born out of the need to modernize a legacy fleet management system. 
    The goal was to create a scalable, fault-tolerant system capable of handling thousands of concurrent requests 
    from vehicle GPS trackers and administrative users. We chose a microservices architecture to allow independent 
    scaling of the ingestion services (receiving GPS data) and the reporting services.`,
    challenges: [
      "Handling real-time data ingestion from hundreds of simultaneous connections without blocking the main event loop.",
      "Ensuring data consistency across distributed services using eventual consistency patterns.",
      "Managing complex permission levels for different types of administrative roles."
    ],
    solutions: [
      "Implemented a message queue system (RabbitMQ) to buffer incoming GPS data.",
      "Used Eureka for dynamic service discovery and load balancing.",
      "Developed a custom RBAC guard in NestJS to manage permissions efficiently."
    ]
  },
  {
    slug: 'marketplace-platform',
    title: 'E-Commerce Marketplace Platform',
    image: `${import.meta.env.BASE_URL}assets/img/amazon.png`,
    description: `Complete marketplace with Spring Boot backend and React/TypeScript frontend.`,
    highlights: [
      { label: 'Performance', text: '<strong>85% faster response</strong> (300ms → 45ms) via Redis caching and <strong>~70% query reduction</strong>.' },
      { label: 'Quality', text: '<strong>90% test coverage</strong> with Jenkins CI/CD pipeline.' },
      { label: 'Cloud', text: 'Deployed on Azure Container Apps with Azure Blob Storage for media.' }
    ],
    technologies: [
      { name: 'Spring Boot', iconClass: 'devicon-spring-original' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
      { name: 'Redis', iconClass: 'devicon-redis-plain' },
      { name: 'Swagger', iconClass: 'devicon-swagger-plain' },
      { name: 'React', iconClass: 'devicon-react-original' },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
      { name: 'TailwindCSS', iconClass: 'devicon-tailwindcss-original' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
      { name: 'Jenkins', iconClass: 'devicon-jenkins-plain' },
      { name: 'Azure', iconClass: 'devicon-azure-plain' },
    ],
    links: [
      {
        url: 'https://github.com/DavidJosueP2/Marketplace_Link',
        label: 'Backend Source Code',
        iconClass: 'fab fa-github',
      },
      {
        url: 'https://github.com/DavidJosueP2/Marketplace-Link-Front',
        label: 'Frontend Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: "A high-performance marketplace platform built with Spring Boot backend and React/TypeScript frontend. The system features JWT/RBAC security, pagination, content moderation, and is deployed on Azure Container Apps with Azure Blob Storage for media asset management. Achieved 90% test coverage through comprehensive testing and CI/CD automation.",
    challenges: [
      "Optimizing database queries to reduce latency and prevent N+1 query problems.",
      "Implementing secure authentication and role-based access control for different user types.",
      "Managing media assets efficiently in a cloud environment.",
      "Maintaining code quality and automated deployments with high test coverage."
    ],
    solutions: [
      "Applied 3NF normalization and N+1 query prevention, reducing query count by ~70%.",
      "Implemented multi-layer Redis caching and query optimization, improving API response times from ~300ms to ~45ms.",
      "Built RESTful APIs with JWT/RBAC security, pagination, and content moderation features.",
      "Set up a robust CI/CD pipeline with Jenkins achieving 90% test coverage.",
      "Deployed on Azure Container Apps and integrated Azure Blob Storage for scalable media management."
    ]
  },
  {
    slug: 'medical-clinic',
    title: 'Medical Clinic Management System',
    image: `${import.meta.env.BASE_URL}assets/img/clinic-front.jpeg`,
    description: `HIPAA-compliant full-stack healthcare system.`,
    highlights: [
      { label: 'Impact', text: '<strong>60% faster</strong> medical record access via 3NF normalization.' },
      { label: 'Architecture', text: 'Spring Boot backend following <strong>Clean Architecture</strong>.' },
      { label: 'Security', text: 'RBAC & JWT authentication for HIPAA compliance.' }
    ],
    technologies: [
      { name: 'Spring Boot', iconClass: 'devicon-spring-original' },
      { name: 'React Native', iconClass: 'devicon-react-original' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
      { name: 'Redis', iconClass: 'devicon-redis-plain' },
      { name: 'Swagger', iconClass: 'devicon-swagger-plain' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
      { name: 'TailwindCSS', iconClass: 'devicon-tailwindcss-original' },
    ],
    links: [
      {
        url: 'https://github.com/DRTX2/clinic',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: `HIPAA-compliant full-stack healthcare system handling appointments, medical history, and audit trails. 
    Includes admin dashboards and a mobile app for patients. The focus was on data integrity, security, and performance.`,
    challenges: [
      "Ensuring strict data privacy compliance (HIPAA).",
      "Handling complex relationships between doctors, patients, and appointments.",
      "Optimizing response times for large medical history records."
    ],
    solutions: [
      "Implemented strict RBAC middleware and audit logging.",
      "Designed a highly normalized database schema (3NF) with proper indexing.",
      "Used Redis for caching frequently accessed non-sensitive data."
    ]
  },
  {
    slug: 'inventory-system',
    title: 'Inventory & Audits System',
    image: `${import.meta.env.BASE_URL}assets/img/maintenance_system.png`,
    description: `Web system for state entities managing inventories and compliance.`,
    highlights: [
      { label: 'Compliance', text: 'Automated PDF reports for judicial audits.' },
      { label: 'Role Management', text: 'Custom role-based access for different state entities.' },
      { label: 'Stack', text: 'Laravel + React with Material UI.' }
    ],
    technologies: [
      { name: 'Laravel', iconClass: 'devicon-laravel-original' },
      { name: 'React', iconClass: 'devicon-react-original' },
      { name: 'MySQL', iconClass: 'devicon-mysql-original' },
      { name: 'Swagger', iconClass: 'devicon-swagger-plain' },
      { name: 'Material UI', iconClass: 'devicon-materialui-plain' },
    ],
    links: [
      {
        url: 'https://github.com/DRTX2/maintenance-system',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
  },
  {
    slug: 'smartnotes-platform',
    title: 'SmartNotes Microservices',
    image: `${import.meta.env.BASE_URL}assets/img/smartnotes.png`,
    description: `Scalable note-taking platform with microservices.`,
    highlights: [
      { label: 'Architecture', text: 'Event-driven communication with RabbitMQ.' },
      { label: 'Gateway', text: 'NGINX API Gateway for routing and auth.' },
      { label: 'Database', text: 'Hybrid data storage with MongoDB and PostgreSQL.' }
    ],
    technologies: [
      { name: 'NestJS', iconClass: 'devicon-nestjs-original' },
      { name: 'RabbitMQ', iconClass: 'devicon-rabbitmq-original' },
      { name: 'MongoDB', iconClass: 'devicon-mongodb-original' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
    ],
    links: [
      {
        url: 'https://github.com/DRTX2/note-app',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
  },
  {
    slug: 'uta-elections',
    title: 'UTA Elections Platform',
    image: `${import.meta.env.BASE_URL}assets/img/uta_page.jpeg`,
    description: `Digital campaign platform for University Rector elections.`,
    highlights: [
      { label: 'Engagement', text: 'Real-time stats and news for university stakeholders.' },
      { label: 'Design', text: 'Responsive UI with Bootstrap and Laravel.' }
    ],
    technologies: [
      { name: 'Laravel', iconClass: 'devicon-laravel-original' },
      { name: 'Bootstrap', iconClass: 'devicon-bootstrap-plain' },
      { name: 'MySQL', iconClass: 'devicon-mysql-original' },
    ],
    links: [
      {
        url: 'https://gitlab.com/personalprojects5531442/manejo-proyecto/',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
  },
  {
    slug: 'creative-portfolio',
    title: 'My Creative Portfolio',
    image: `${import.meta.env.BASE_URL}assets/img/blog.jpeg`,
    description: `Interactive platform for creating personal portfolios.`,
    highlights: [
      { label: 'Features', text: 'Project management and community engagement.' },
      { label: 'Tech', text: 'PHP, MySQL, and Axios for dynamic interactions.' }
    ],
    technologies: [
      { name: 'PHP', iconClass: 'devicon-php-plain' },
      { name: 'MySQL', iconClass: 'devicon-mysql-original' },
      { name: 'JavaScript', iconClass: 'devicon-javascript-plain' },
    ],
    links: [
      {
        url: 'https://github.com/DRTX2/proyecto-mds.git',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
  },
  {
    slug: 'clean-architecture-game',
    title: 'Pixel1 Quest',
    image: `${import.meta.env.BASE_URL}assets/img/capibara.jpeg`,
    description: `Unity 2D game showcasing enterprise architecture patterns.`,
    highlights: [
      { label: 'Concept', text: 'Applying <strong>SOLID principles</strong> to Game Development.' },
      { label: 'Patterns', text: 'Factory, Strategy, Observer, and Event Bus implementation.' },
      { label: 'Tech', text: 'Managed state persistence with SQLite.' }
    ],
    technologies: [
      { name: 'C#', iconClass: 'devicon-csharp-plain' },
      { name: 'Unity', iconClass: 'devicon-unity-plain' },
      { name: 'SQLite', iconClass: 'devicon-sqlite-plain' },
    ],
    links: [
      {
        url: 'https://github.com/DRTX2/PatternsProject/tree/develop',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: "A unique project bridging the gap between game development and enterprise software architecture. It demonstrates that the same principled approach used in large-scale backend systems can be applied to game logic to create maintainable and testable code.",
    challenges: [
      "Decoupling the game logic from the Unity Engine API.",
      "Implementing Dependency Injection in a Unity environment.",
      "Managing complex game state in a persistent way."
    ],
    solutions: [
      "Created an abstraction layer between the game logic and Unity's Monobehaviours.",
      "Implemented a custom Service Locator and Factory pattern for dependency management.",
      "Used SQLite for structured local data persistence, allowing complex save states."
    ],
    videoUrl: 'https://www.youtube.com/watch?v=wLPdfB5ABbU'
  },
];
