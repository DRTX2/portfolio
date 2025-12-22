import type { Technology, Link } from '../components/ProjectCard.astro';

export interface ProjectData {
  slug: string;
  title: string;
  image: string;
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
