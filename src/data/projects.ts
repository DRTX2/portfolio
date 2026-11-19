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
  status?: 'in-progress';
}

export const projects: ProjectData[] = [
  {
    slug: 'atalaya',
    title: "Atalaya — Developer Infrastructure Platform",
    image: `${import.meta.env.BASE_URL}assets/img/atalaya/cover.webp`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/atalaya/cover.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/console-overview.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/console-incident.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/console-gamedays.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/nimbus-incidents.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/flagship-history.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/hookrelay-message.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/bitacora-postmortem.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/nimbus-pipelines.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/flagship-detail.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/hookrelay-overview.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/nimbus-workflows.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/hookrelay-endpoints.webp`,
      `${import.meta.env.BASE_URL}assets/img/atalaya/hookrelay-grafana.webp`,
    ],
    description: "Four independent products that close the loop detect → mitigate → notify → recover → learn: Nimbus watches AWS async pipelines, Flagship controls features with kill switches, Hookrelay delivers events reliably, and Bitácora turns each incident into a timeline and a postmortem. Integrated only through signed, idempotent HTTP APIs.",
    highlights: [
      { label: "End-to-end, asserted", text: "A stalled pipeline in <strong>Nimbus</strong> turns a flag off in <strong>Flagship</strong> (SDKs see it in <strong>680 ms</strong>), <strong>Hookrelay</strong> notifies the customer webhook and <strong>Bitácora</strong> drafts the postmortem; recovery restores everything, all visible in one <strong>Atalaya Console</strong>." },
      { label: "Learns from every incident", text: "<strong>Bitácora</strong>, serverless on AWS (API Gateway, Lambda, DynamoDB), rebuilds each incident's timeline from the webhooks, measures time to mitigate and recover, and drafts the <strong>postmortem</strong>." },
      { label: "Proven by game days", text: "Every failure mode is a declarative <strong>chaos experiment</strong> that runs in CI: broken links, a crashed consumer, a database failover, all under real customer traffic. Game days found <strong>7 defects</strong> the unit suites missed (lost events, a crash on failover, stale SDKs…), each fixed with a regression test: now <strong>8/8</strong>, and a failed mitigation <strong>escalates</strong> to on-call." },
      { label: "Production-shaped", text: "Hexagonal cores, <strong>one OpenTelemetry trace per incident</strong> across every product, <strong>SSO (OIDC) with roles</strong> and audited actions, k6-measured, Playwright E2E, <strong>Terraform on AWS</strong> (ECS for the services, <strong>Lambda + DynamoDB</strong> for Bitácora), GitHub Actions with OIDC, CodeQL/Trivy clean." },
    ],
    technologies: [
      { name: "NestJS", iconClass: "devicon-nestjs-original" },
      { name: "Go", iconClass: "devicon-go-original-wordmark" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "Next.js 16", iconClass: "devicon-nextjs-plain" },
      { name: "Toxiproxy (chaos)", iconClass: "fa-solid fa-bolt" },
      { name: "Angular 22", iconClass: "devicon-angularjs-plain" },
      { name: "React", iconClass: "devicon-react-original" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "Redis / BullMQ", iconClass: "devicon-redis-plain" },
      { name: "AWS ECS · Lambda", iconClass: "devicon-amazonwebservices-plain-wordmark" },
      { name: "DynamoDB", iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/dynamodb/dynamodb-original.svg" },
      { name: "Terraform", iconClass: "devicon-terraform-plain" },
      { name: "GitHub Actions", iconClass: "devicon-githubactions-plain" },
      { name: "OpenTelemetry", iconImg: "https://cdn.simpleicons.org/opentelemetry" },
      { name: "Prometheus · Grafana", iconClass: "devicon-prometheus-original" },
      { name: "Playwright", iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/playwright/playwright-original.svg" },
      { name: "Vitest · k6", iconClass: "devicon-vitest-plain" },
      { name: "Docker", iconClass: "devicon-docker-plain" },
    ],
    links: [
      { url: "https://github.com/DRTX2/atalaya", label: "Platform", iconClass: "fab fa-github" },
      { url: "https://github.com/DRTX2/hookrelay", label: "Hookrelay", iconClass: "fab fa-github" },
      { url: "https://github.com/DRTX2/flagship", label: "Flagship", iconClass: "fab fa-github" },
      { url: "https://github.com/DRTX2/nimbus", label: "Nimbus", iconClass: "fab fa-github" },
      { url: "https://github.com/DRTX2/bitacora", label: "Bitácora", iconClass: "fab fa-github" },
    ],
    detailedDescription: "Atalaya (Spanish for watchtower) is a developer infrastructure platform made of four products, each with its own repository, database and pipeline, each useful alone.\n\nHookrelay is webhook delivery as a service: idempotent ingestion, fan-out, Standard Webhooks signatures, retries with jitter, circuit breaker, a dead-letter queue with bulk replay, and SSRF protection enforced at connection time. Flagship is feature management with local evaluation: a TypeScript SDK downloads the ruleset once, evaluates in about 1 µs, and receives changes over a stream fanned out across replicas with PostgreSQL LISTEN/NOTIFY. Nimbus is a guardian for AWS asynchronous pipelines (SQS, Lambda, DLQ) written in Go: explainable detectors, deduplicated incidents and a durable workflow engine on PostgreSQL leases. Bitácora is the incident ledger, serverless on AWS (API Gateway, Lambda, DynamoDB): it subscribes to Hookrelay, rebuilds each incident's timeline from events published by different products, measures time to mitigate and recover, and drafts the postmortem.\n\nTogether they automate an incident: Nimbus detects a stalled consumer and runs a response workflow whose steps call Flagship (kill the risky feature flag) and Hookrelay (notify customer systems). When the pipeline recovers, the flag is restored to its pre-incident configuration, unless a person changed it in the meantime, and Bitácora records the whole response. The whole scenario runs locally with one Docker Compose file and a script that asserts every step.\n\nIts resilience is tested, not assumed. Every link between the products runs through a fault-injection proxy, and declarative game days break one link at a time and check the architecture's claims against real product data. The first game day found three real defects: a retry budget shorter than a restart, flag events lost during a short outage, and a restore dropped when deliveries arrived out of order. Each one was fixed and is now covered by a test. A second game day broke the real thing: k6 customers placing orders through SQS and a Lambda-style consumer, a crashed consumer, a database failover. It found a Flagship crash on failover, SDKs left stale after it, and two bugs in the test tooling itself; all fixed, and a mitigation that cannot happen now escalates to on-call. Every incident is one OpenTelemetry trace across the products. The Atalaya Console, a Next.js BFF behind Keycloak SSO, shows one incident timeline built from the four products' own records, links its trace, and lets operators act, with every action audited.",
    features: [
      "Hookrelay: no lost events (message and deliveries in one transaction, sweeper for orphans), DLQ with replay that is safe under concurrent replays, measured p95 3.9 ms at 200 req/s.",
      "Flagship: sticky percentage rollouts with MurmurHash3, optimistic concurrency, audit log with one-click rollback, 2,000 SDK streams per replica updated in under 62 ms.",
      "Nimbus: four explainable detectors, row-level security per tenant, approvals, transactional outbox, 71 Gherkin acceptance scenarios.",
      "Bitácora: serverless incident ledger (API Gateway, three least-privilege Lambdas, single-table DynamoDB, KMS), idempotent and order-independent, tested against DynamoDB Local.",
      "Game days: eight declarative chaos experiments in CI (network faults through Toxiproxy, process and database faults through Docker, real k6 traffic on a protected orders app). They found seven defects, all fixed; now 8/8. A mitigation that fails escalates to on-call.",
      "Atalaya Console: a Next.js 16 BFF (tokens never reach the browser) that merges the four products into one incident timeline, links each incident to its distributed trace, and lets operators act (acknowledge, resend, flip a flag) behind Keycloak SSO with every action audited.",
      "Integration by contract only: HMAC-signed requests, 5-minute replay window, idempotency keys derived from incident and version.",
      "Every integration is optional: each product keeps working if another is down.",
      "Each repo ships architecture docs, ADRs, test plan, runbook, security model, CI and Terraform for AWS.",
    ],
    challenges: [
      "Joining four products without coupling them: no shared database, queue or code, and no product allowed to depend on another being up.",
      "All three deliver at-least-once, so a retried step could kill a flag twice or notify twice.",
      "Letting automation change production behaviour without it ever fighting a person who is handling the incident.",
      "Rebuilding one timeline from two publishers whose events arrive out of order, more than once, and later than they happened.",
      "Proving the failure-mode table instead of trusting it: each product's test suite mocks its neighbours, so defects that only appear between products slip through.",
    ],
    solutions: [
      "Integration through public HTTP endpoints authenticated by HMAC signatures over the raw body, each one behind an environment variable that turns it off.",
      "Made every hop idempotent: Flagship answers \"already off\", Hookrelay returns the original message for the same incident key.",
      "Flagship restores a flag only when the latest audit entry is still that incident's kill; otherwise it leaves the flag alone and says why. Covered by integration tests.",
      "Bitácora writes idempotently (keys include the webhook id, timestamps use if_not_exists) and orders events by the source time Nimbus now stamps (occurredAt). The end-to-end demo is what caught that delivery time put \"opened\" after \"mitigated\".",
      "Declarative game days break links, processes and databases (Toxiproxy and Docker) while k6 customers place real orders, and check each claim with real product data. They found seven defects, five in the products and two in the test tooling; each was fixed with a regression test, the suite passes 8 of 8 in CI, and a mitigation that cannot happen now escalates instead of failing silently.",
    ],
  },
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
      { name: 'ASP.NET Core 9', iconClass: 'devicon-dot-net-plain' },
      { name: 'Next.js 16', iconClass: 'devicon-nextjs-plain' },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
      { name: 'PostgreSQL', iconClass: 'devicon-postgresql-plain' },
      { name: 'OpenIddict', iconImg: 'https://cdn.simpleicons.org/openid' },
      { name: 'EF Core 9', iconClass: 'devicon-dot-net-plain' },
      { name: 'Azure', iconClass: 'devicon-azure-plain' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
      { name: 'MediatR (CQRS)', iconClass: 'devicon-dot-net-plain' },
      { name: 'Hangfire', iconImg: 'https://cdn.simpleicons.org/clockify' },
      { name: 'MassTransit', iconImg: 'https://cdn.simpleicons.org/rabbitmq' },
      { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-original' },
    ],
    links: [
      // Live demo offline (not redeployed yet) — uncomment when it is back up:
      // {
      //   url: 'https://stayflow-prod-web.purplebay-4e22b9c6.westus3.azurecontainerapps.io',
      //   label: 'Live App',
      //   iconClass: 'fas fa-external-link-alt live-pulse-icon',
      // },
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
    slug: 'kuntur-core-banking',
    title: "Kuntur — Multi-Tenant Core Banking",
    image: `${import.meta.env.BASE_URL}assets/img/kuntur/customer-overview.webp`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/kuntur/customer-overview.webp`,
      `${import.meta.env.BASE_URL}assets/img/kuntur/operations-live.webp`,
      `${import.meta.env.BASE_URL}assets/img/kuntur/risk-review.webp`,
      `${import.meta.env.BASE_URL}assets/img/kuntur/approvals-step-up.webp`,
      `${import.meta.env.BASE_URL}assets/img/kuntur/roles-matrix.webp`,
      `${import.meta.env.BASE_URL}assets/img/kuntur/loans-portfolio.webp`,
    ],
    description: "A core banking platform for credit unions and fintechs: one deployment serves many isolated institutions, books money on a double-entry ledger, speaks ISO 20022 and scores every payment in real time with an explainable risk engine.",
    highlights: [
      { label: "Money is correct", text: "<strong>Double-entry ledger</strong> where the database refuses overdrafts; 20 concurrent transfers against a balance that affords 10 → exactly 10 succeed." },
      { label: "Regulated-grade security", text: "<strong>Row-level security</strong> per tenant, 28 granular permissions, TOTP MFA and <strong>four-eyes approval</strong> with step-up, tamper-evident audit hash chain." },
      { label: "Measured and tested", text: "150 transfers/s at <strong>p95 14 ms</strong> (k6); 128 backend tests with Testcontainers, 15 Playwright E2E, OWASP ZAP in CI." },
    ],
    technologies: [
      { name: "Java 21", iconClass: "devicon-java-plain" },
      { name: "Spring Boot 4", iconClass: "devicon-spring-original" },
      { name: "React 19", iconClass: "devicon-react-original" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "Apache Kafka", iconClass: "devicon-apachekafka-original" },
      { name: "gRPC", iconClass: "devicon-grpc-plain" },
      { name: "WebSocket / STOMP", iconClass: "fas fa-tower-broadcast" },
      { name: "Testcontainers", iconClass: "fas fa-vial" },
      { name: "Playwright", iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/playwright/playwright-original.svg" },
      { name: "AWS", iconClass: "devicon-amazonwebservices-plain-wordmark" },
      { name: "GitHub Actions", iconClass: "devicon-githubactions-plain" },
      { name: "Docker", iconClass: "devicon-docker-plain" },
    ],
    links: [
      { url: "https://github.com/DRTX2/bank", label: "Source Code", iconClass: "fab fa-github" },
    ],
    detailedDescription: "Kuntur (Kichwa for the Andean condor) is a multi-tenant core banking platform built the way a regulated system has to be. Payments go through idempotent intake, real-time risk scoring over gRPC and double-entry booking, with a transactional outbox publishing domain events to Kafka. Customers and staff get live updates over WebSocket.\n\nIt implements ISO 20022 messages (pain.001/002, pacs.008, camt.053), loans with amortization schedules and automatic installment collection at the end-of-day close, and four-eyes approval with a fresh MFA code for high-value operations. Tenancy is enforced twice: in the application and underneath by PostgreSQL row-level security, with the app running as a role that owns nothing.",
    features: [
      "Double-entry ledger with accounts locked in primary-key order, so opposite concurrent transfers cannot deadlock.",
      "ISO 20022: pain.001/002, pacs.008, camt.053, with XML parsing hardened against XXE.",
      "Explainable risk engine: every point of the score is shown to the reviewer.",
      "8 system roles and 28 permissions plus custom roles; TOTP (RFC 6238) with AES-GCM sealed seeds.",
      "Loans: schedule, automatic installments, large loans wait for a second manager.",
      "Transactional outbox to Kafka with a dead-letter topic; crash-recovery sweep re-drives accepted transfers.",
      "CI: CodeQL, gitleaks, Trivy, dependency review, OWASP ZAP baseline, containers and infrastructure workflows.",
    ],
    challenges: [
      "Guaranteeing money is never created or lost under concurrency and crashes.",
      "Isolating institutions so that even a raw SQL mistake cannot cross tenants.",
      "Keeping latency low while every transfer is authenticated, risk-scored and audited.",
    ],
    solutions: [
      "Database-enforced invariants (no overdraft), ordered locking, idempotent booking and a recovery sweep, all covered by concurrency tests on real PostgreSQL and Kafka.",
      "Row-level security with a per-transaction tenant, on top of application-level checks.",
      "Measured with k6 end to end (p95 14 ms at 150 transfers/s) and documented the trade-offs, such as keeping virtual threads off because of pinning.",
    ],
  },
  {
    slug: 'impactex-ims',
    title: 'Impactex IMS - Asset & Inventory Operations',
    image: `${import.meta.env.BASE_URL}assets/img/mao-operational-dashboard.png`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/mao-operational-dashboard.png`,
      `${import.meta.env.BASE_URL}assets/img/mao-dashboard.png`,
      `${import.meta.env.BASE_URL}assets/img/mao-inventory-item.png`,
      `${import.meta.env.BASE_URL}assets/img/mao-maintenance.png`,
      `${import.meta.env.BASE_URL}assets/img/mao-purchases.png`,
      `${import.meta.env.BASE_URL}assets/img/mao-reports.png`,
    ],
    description: `A cloud-deployed platform for tracking organizational assets, inventory operations, maintenance, loans, purchasing, and audit-ready reports.`,
    highlights: [
      { label: 'Operational traceability', text: 'Tracks each asset across custody, location, condition, and its immutable activity history.' },
      { label: 'End-to-end operations', text: 'Brings <strong>inventory, requests, maintenance, loans, purchases, and reports</strong> into one role-aware workspace.' },
      { label: 'Azure delivery', text: 'Built and deployed through <strong>GitHub Actions</strong> to Azure Container Apps using Bicep infrastructure as code.' },
    ],
    technologies: [
      { name: '.NET 10', iconClass: 'devicon-dot-net-plain' },
      { name: 'Angular 20', iconClass: 'devicon-angularjs-plain' },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
      { name: 'EF Core', iconClass: 'devicon-dot-net-plain' },
      { name: 'SQL Server', iconClass: 'devicon-azuresqldatabase-plain' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
      { name: 'Azure Container Apps', iconClass: 'devicon-azure-plain' },
      { name: 'Bicep IaC', iconClass: 'devicon-azure-plain' },
      { name: 'GitHub Actions', iconClass: 'fab fa-github' },
      { name: 'Playwright', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/playwright/playwright-original.svg' },
    ],
    links: [
      // Live demo offline (not redeployed yet) — uncomment when it is back up:
      // {
      //   url: 'https://mao-prod-web.purplebay-4e22b9c6.westus3.azurecontainerapps.io/',
      //   label: 'Live App',
      //   iconClass: 'fas fa-external-link-alt live-pulse-icon',
      // },
      {
        url: 'https://github.com/DRTX2/mao-inventory-maintaining-system',
        label: 'Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: `Impactex IMS is a full-stack operations platform for managing serialized assets and inventory without losing the context of where each item is, who is responsible for it, or what happened to it previously. Its Angular interface supports inventory, requests, maintenance work orders, loans and returns, purchasing, notifications, role-based administration, and PDF or spreadsheet reporting from a unified workspace.

The .NET 10 API uses EF Core with SQL Server and a domain model designed for traceable, controlled transitions. JWT authentication and granular roles limit access by operational responsibility. Attachments are validated and stored outside the database with SHA-256 metadata, then served only through authorized endpoints. GitHub Actions builds and deploys the web and API containers to Azure Container Apps using Bicep. The infrastructure provisions secure service boundaries, an Azure Files mount for attachments, health probes, and a dedicated migration job.`,
    challenges: [
      'Representing custody, location, maintenance, purchasing, and loan workflows while preserving an auditable history for each asset.',
      'Protecting files and operational data with permissions that remain consistent across the API and Angular interface.',
      'Deploying application containers, storage, migrations, and secrets reproducibly without production configuration in source control.'
    ],
    solutions: [
      'Separated serialized assets from consumable stock and modeled controlled transitions for transfers, requests, maintenance, loans, purchases, and disposal.',
      'Applied JWT authorization, department-aware roles, protected attachment endpoints, and SHA-256 metadata for stored files.',
      'Automated CI/CD with GitHub Actions and Bicep-based Azure Container Apps infrastructure, including health checks, migration jobs, and persistent Azure Files storage.',
      'Covered critical workflows with backend regression and integration suites, Angular tests, and Playwright end-to-end scenarios.'
    ]
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
      { name: 'Playwright', iconImg: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/playwright/playwright-original.svg' },
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
    slug: 'hospital-management-system',
    title: 'Hospital Management System',
    image: `${import.meta.env.BASE_URL}assets/img/hospital-management-system.png`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/hospital-management-system.png`,
      `${import.meta.env.BASE_URL}assets/img/hospital-reports-dashboard.png`,
    ],
    description: `A modular hospital platform that centralizes clinical administration, consultations, and reporting behind a secure microservices gateway.`,
    highlights: [
      { label: 'Microservices', text: '<strong>Six Spring Boot services</strong> separate discovery, access, administration, consultations, and reporting.' },
      { label: 'Secure access', text: 'A shared <strong>JWT authentication service</strong> and API gateway protect every backend endpoint.' },
      { label: 'Scalable data', text: 'PostgreSQL can scale horizontally with <strong>Citus sharding</strong> by medical center.' },
    ],
    technologies: [
      { name: 'Java 17', iconClass: 'devicon-java-plain' },
      { name: 'Spring Boot', iconClass: 'devicon-spring-original' },
      { name: 'Spring Cloud', iconClass: 'devicon-spring-original' },
      { name: 'React', iconClass: 'devicon-react-original' },
      { name: 'PostgreSQL / Citus', iconClass: 'devicon-postgresql-plain' },
      { name: 'Docker Compose', iconClass: 'devicon-docker-plain' },
      { name: 'OpenAPI', iconClass: 'devicon-swagger-plain' },
    ],
    links: [
      {
        url: 'https://github.com/JosueGarciaAbata/hospital-management-system',
        label: 'Backend Source Code',
        iconClass: 'fab fa-github',
      },
      {
        url: 'https://github.com/DavidJosueP2/Hospital-Front',
        label: 'Frontend Source Code',
        iconClass: 'fab fa-github',
      },
    ],
    detailedDescription: `This hospital management system distributes operational responsibilities across independently deployable Spring Boot services. An API gateway is the controlled entry point for the React administration interface, while Eureka enables the services to locate one another without hard-coded addresses. The platform covers staff, doctors, specialties and medical centers, records consultations, and turns that data into reporting dashboards.

Authentication is issued centrally and validated throughout the platform with JWTs. Each service exposes its own documented REST contract, which is collected into a single OpenAPI experience through the gateway. PostgreSQL is the primary data store, with an optional Citus layout that partitions information by medical center as the organization grows. Docker Compose profiles support both a local baseline and a distributed setup.`,
    challenges: [
      'Separating hospital administration, consultation workflows, reporting, and access control without creating a tightly coupled backend.',
      'Keeping inter-service discovery, routing, and authorization manageable as services are added or scaled.',
      'Providing a data architecture that can grow from one installation to multiple medical centers.'
    ],
    solutions: [
      'Organized the backend into focused Spring Boot services registered through Eureka and exposed only through Spring Cloud Gateway.',
      'Centralized JWT issuance in the authentication service so the gateway and internal services share one access model.',
      'Used PostgreSQL with an optional Citus distribution strategy and containerized the stack with Docker Compose profiles.',
      'Delivered a React administration interface for operational data and consultation analytics, with aggregated OpenAPI documentation.'
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
      // Live demo offline (not redeployed yet) — uncomment when it is back up:
      // {
      //   url: 'https://iron-zone.stratiumhub.com',
      //   label: 'Live App',
      //   iconClass: 'fas fa-external-link-alt live-pulse-icon',
      // },
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
    slug: 'nexus-messenger',
    title: "Nexus Messenger — Real-Time Team Messaging",
    image: `${import.meta.env.BASE_URL}assets/img/nexus/nexus-5.webp`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/nexus/nexus-5.webp`,
      `${import.meta.env.BASE_URL}assets/img/nexus/nexus-1.webp`,
      `${import.meta.env.BASE_URL}assets/img/nexus/nexus-2.webp`,
      `${import.meta.env.BASE_URL}assets/img/nexus/nexus-3.webp`,
      `${import.meta.env.BASE_URL}assets/img/nexus/nexus-4.webp`,
      `${import.meta.env.BASE_URL}assets/img/nexus/nexus-call.webp`,
    ],
    description: "A real-time messaging platform with direct and group conversations, presence, typing indicators, file sharing and 1:1 voice and video calls over WebRTC, built on Angular signals and Laravel Reverb WebSockets.",
    highlights: [
      { label: "Real-time core", text: "Messages, presence and typing events are broadcast over <strong>Laravel Reverb</strong> WebSockets and consumed with Laravel Echo." },
      { label: "Modern frontend", text: "<strong>Angular 21</strong> with signals and RxJS, Tailwind CSS 4, HTTP interceptors with automatic JWT refresh." },
      { label: "Tested", text: "Feature tests for messaging, API coverage and <strong>security regressions</strong> with Pest; Vitest on the client; SonarQube configured." },
    ],
    technologies: [
      { name: "Angular 21", iconClass: "devicon-angularjs-plain" },
      { name: "Laravel 12", iconClass: "devicon-laravel-original" },
      { name: "WebRTC", iconClass: "fa-solid fa-video" },
      { name: "PHP", iconClass: "devicon-php-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "WebSockets (Reverb)", iconClass: "fas fa-tower-broadcast" },
      { name: "Tailwind CSS 4", iconClass: "devicon-tailwindcss-original" },
      { name: "Nginx", iconClass: "devicon-nginx-original" },
      { name: "Docker", iconClass: "devicon-docker-plain" },
    ],
    links: [
      { url: "https://github.com/DRTX2/Messaging-app", label: "Source Code", iconClass: "fab fa-github" },
    ],
    detailedDescription: "Nexus Messenger is a full-stack messaging application. An Angular single-page app talks to a Laravel REST API for conversations, messages and attachments, and listens to WebSocket channels served by Laravel Reverb for everything that must feel live: new messages, who is online and who is typing.\n\nData lives in PostgreSQL (users, conversations with many-to-many membership for groups, messages, attachments). Authentication is stateless with JWT and refresh handled by HTTP interceptors. The stack runs with Docker Compose behind Nginx.",
    features: [
      "Direct and group conversations with many-to-many membership.",
      "Presence and typing indicators over private WebSocket channels.",
      "Drag-and-drop file and image sharing with previews.",
      "JWT authentication with intercepted requests and automatic refresh.",
      "Dark theme and responsive layout.",
    ],
    challenges: [
      "Keeping every participant of a conversation in sync without polling.",
      "Authorizing private real-time channels per conversation.",
    ],
    solutions: [
      "Broadcast domain events from Laravel through Reverb and applied them to Angular signal state on the client.",
      "Channel authorization on the API using the same JWT identity as the REST endpoints, covered by security regression tests.",
    ],
  },
  {
    slug: 'jarvis-assistant',
    title: "Jarvis — Private AI Study & Planning Assistant",
    status: 'in-progress',
    image: `${import.meta.env.BASE_URL}assets/img/jarvis/jarvis-1.webp`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/jarvis/jarvis-1.webp`,
      `${import.meta.env.BASE_URL}assets/img/jarvis/jarvis-2.webp`,
      `${import.meta.env.BASE_URL}assets/img/jarvis/jarvis-3.webp`,
      `${import.meta.env.BASE_URL}assets/img/jarvis/jarvis-4.webp`,
    ],
    description: "A personal assistant in Spanish that runs on your own machine: reminders that actually ring, spaced-repetition study and voice-driven task management, with local AI by default and the cloud as an explicit opt-in.",
    highlights: [
      { label: "Local-first AI", text: "Runs on <strong>Ollama</strong> locally; dictation is transcribed on-device with <strong>Whisper</strong>. Claude is optional and only for messages you choose." },
      { label: "Actions with guardrails", text: "The model proposes tool calls validated with <strong>zod</strong>; creating tasks is instant and undoable, destructive actions ask for confirmation." },
      { label: "Learning science", text: "Adaptive review with the <strong>FSRS</strong> spaced-repetition algorithm and web-push reminders, tested with Playwright on desktop and mobile." },
    ],
    technologies: [
      { name: "Node.js", iconClass: "devicon-nodejs-plain" },
      { name: "Express", iconClass: "devicon-express-original" },
      { name: "React", iconClass: "devicon-react-original" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "Ollama (local LLM)", iconClass: "fas fa-microchip" },
      { name: "Whisper", iconClass: "fas fa-microphone" },
      { name: "Claude API", iconClass: "fas fa-cloud" },
      { name: "Web Push / PWA", iconClass: "fas fa-bell" },
      { name: "Playwright", iconImg: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/playwright/playwright-original.svg" },
    ],
    links: [
    ],
    detailedDescription: "Jarvis is a work in progress: a private assistant for studying and organizing the day. You write or dictate things like \"remind me to review derivatives every day at 8\" and it creates the reminder, which arrives as a system notification on the PC and, optionally, on the phone.\n\nThe AI runs locally through Ollama, and voice is transcribed on the machine with Whisper, so audio never leaves it. A cloud model can be enabled for hard questions, per message, with a daily request cap. Study sessions use the FSRS algorithm: each question gets its own schedule depending on what you forget.\n\nStill in progress: packaging for non-technical users and the knowledge-base features described in the roadmap.",
    features: [
      "Reminders and recurring reminders from natural language, delivered with web push.",
      "Task management by chat with instant undo and confirmation for destructive actions.",
      "Spaced repetition (FSRS) with a daily review notice.",
      "On-device speech-to-text (whisper-large-v3-turbo).",
      "Daily summary computed without AI.",
      "Installable as a PWA; reachable from the phone through a private Tailscale network.",
    ],
    challenges: [
      "Letting a language model act on personal data without it doing something the user did not intend.",
      "Keeping the experience fast and private on consumer hardware.",
    ],
    solutions: [
      "Model output is treated as a proposal: validated against zod schemas, applied through explicit tools, reversible or confirmed.",
      "Local models by default, streaming responses, and an explicit per-message switch to the cloud.",
    ],
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
        url: 'https://github.com/DRTX2/PM-bot',
        label: 'Source Code',
        iconClass: 'fab fa-github',
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
    slug: 'publication-management-and-moderation-system',
    title: 'Publication Management & Moderation Platform',
    image: `${import.meta.env.BASE_URL}assets/img/publication-management-system.png`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/publication-management-system.png`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-catalog.png`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-moderation-dashboard.png`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-profile-location.png`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-login.png`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-users-admin.webp`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-moderators.webp`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-my-incidents.webp`,
      `${import.meta.env.BASE_URL}assets/img/marketplace-jenkins-pipeline.webp`,
    ],
    description: `A location-aware marketplace with Azure-hosted media, a complete moderation workflow, and automated quality gates from build to deployment.`,
    highlights: [
      { label: 'Location-aware', text: '<strong>PostGIS spatial queries</strong> filter and rank listings by distance.' },
      { label: 'Azure services', text: 'Product media is stored in <strong>Azure Blob Storage</strong>, while deployment secrets are handled through Azure Key Vault.' },
      { label: 'Automated QA', text: 'Jenkins runs <strong>build, static analysis, integration, API, performance, and security checks</strong> before releases.' }
    ],
    technologies: [
      { name: 'Java', iconClass: 'devicon-java-plain' },
      { name: 'Spring Boot', iconClass: 'devicon-spring-original' },
      { name: 'React', iconClass: 'devicon-react-original' },
      { name: 'TypeScript', iconClass: 'devicon-typescript-plain' },
      { name: 'PostgreSQL / PostGIS', iconClass: 'devicon-postgresql-plain' },
      { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-original' },
      { name: 'Docker', iconClass: 'devicon-docker-plain' },
      { name: 'Jenkins', iconClass: 'devicon-jenkins-plain' },
      { name: 'Azure Blob Storage', iconClass: 'devicon-azure-plain' },
      { name: 'Azure Key Vault', iconClass: 'devicon-azure-plain' },
      { name: 'Postman / Newman', iconClass: 'devicon-postman-plain' },
      { name: 'OpenAPI', iconClass: 'devicon-swagger-plain' },
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
    detailedDescription: `This full-stack marketplace connects product listings with the people most likely to need them nearby. The Spring Boot API persists listing locations with PostgreSQL and geospatial capabilities, while the React and TypeScript frontend provides the catalog and account experience. Sellers can attach images to their publications, and users can verify their email, recover access, and browse securely with JWT-protected sessions.

Catalog safety is a first-class workflow rather than an afterthought. Users can report a publication, moderators can investigate and resolve the case from their dashboard, and sellers can appeal decisions with the status history retained. The backend follows explicit entity, DTO, mapping, repository, service, and controller layers. Product images are stored in Azure Blob Storage, while Azure Key Vault supplies deployment secrets.

Quality is enforced throughout the delivery path. Jenkins pipelines compile the applications, run static analysis and coverage checks, provision automatic integration environments with Testcontainers, execute Postman collections through Newman, and run performance, end-to-end, and dynamic security tests. The same containerized pipeline supports local validation and remote Azure deployments.`,
    challenges: [
      'Making local product discovery accurate and efficient without reducing the catalog to a generic list of results.',
      'Supporting reports, reviews, resolution states, and seller appeals in an auditable moderation process.',
      'Maintaining reliable local and remote releases while verifying quality, security, and secrets management across the full stack.'
    ],
    solutions: [
      'Implemented geospatial filters and distance ordering with PostgreSQL/PostGIS, plus Azure Blob Storage for publication media.',
      'Built a complete moderation flow for reported listings, moderator decisions, and seller appeals.',
      'Secured account access with JWT, email verification, password recovery, OpenAPI contracts, and deployment secrets in Azure Key Vault.',
      'Automated Jenkins quality gates for compilation, static analysis, JaCoCo coverage, Testcontainers integration tests, Postman/Newman API checks, JMeter, OWASP ZAP, Selenium, and Playwright before Docker-based local and Azure releases.'
    ]
  },
  {
    slug: 'medical-clinic',
    title: 'Medical Clinic Management System',
    image: `${import.meta.env.BASE_URL}assets/img/clinic/cover.webp`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/clinic/cover.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/admin-appointments.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-login.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-doctors.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-doctor-profile.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-request-appointment.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-appointments.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-cancel-request.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-notifications.webp`,
      `${import.meta.env.BASE_URL}assets/img/clinic/mobile-doctors-light.webp`,
    ],
    description: `HIPAA-compliant full-stack healthcare system.`,
    highlights: [
      { label: 'Impact', text: '<strong>60% faster</strong> medical record access via 3NF normalization.' },
      { label: 'Architecture', text: 'Spring Boot backend following <strong>Clean Architecture</strong>.' },
      { label: 'Security', text: 'RBAC & JWT authentication for HIPAA compliance.' },
      { label: 'Mobile app', text: '<strong>React Native</strong> patient app to browse doctors, book and cancel appointments, and get notifications.' }
    ],
    technologies: [
      { name: 'Spring Boot', iconClass: 'devicon-spring-original' },
      { name: 'React', iconClass: 'devicon-react-original' },
      { name: 'React Native', iconClass: 'devicon-react-original' },
      { name: 'Resilience4j', iconClass: 'devicon-java-plain' },
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
    slug: 'uta-elections',
    title: "Election Campaign Platform — University Rector Race",
    image: `${import.meta.env.BASE_URL}assets/img/uta_page.jpeg`,
    images: [
      `${import.meta.env.BASE_URL}assets/img/uta_page.jpeg`,
    ],
    description: "A campaign site and voter-engagement backend for a university rector election: candidates, proposals, news and events with search, voter registration and participation statistics.",
    highlights: [
      { label: "Domain model", text: "12 Eloquent models (candidates, parties, proposals, events, news, voters, suggestions) over <strong>17 migrations</strong>." },
      { label: "Search", text: "Proposals, events and news are searchable by text, tag and date." },
      { label: "Engagement", text: "Voter registration flow, suggestion box and a <strong>statistics</strong> view for the campaign team." },
    ],
    technologies: [
      { name: "Laravel", iconClass: "devicon-laravel-original" },
      { name: "PHP", iconClass: "devicon-php-plain" },
      { name: "MySQL", iconClass: "devicon-mysql-original" },
      { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original" },
      { name: "Vite", iconClass: "devicon-vitejs-plain" },
    ],
    links: [
      { url: "https://gitlab.com/personalprojects5531442/manejo-proyecto/", label: "Source Code", iconClass: "fab fa-gitlab" },
    ],
    detailedDescription: "Built by a team of four for a university rector election campaign. The Laravel application models candidates with their academic and professional background, political parties, proposals, news and events, and exposes filtered listings for each. Voters complete a registration form, can send suggestions, and the campaign team sees aggregated statistics.",
    challenges: [
      "Modelling many related entities (candidates, backgrounds, parties, proposals) without duplicating data.",
      "Making content easy to find for non-technical visitors.",
    ],
    solutions: [
      "A normalized schema managed entirely with migrations and Eloquent relationships.",
      "Dedicated search routes by tag and date for each content type.",
    ],
  }
];
