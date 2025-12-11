/**
 * Skills Data
 * Centralized skill categories and items
 */

export const skillCategories = [
  {
    id: 'backend',
    title: 'Backend Development',
    skills: [
      { name: 'Java', icon: 'java/java-original.svg' },
      { name: 'Spring Boot', icon: 'spring/spring-original.svg' },
      { name: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'express/express-original.svg' },
      { name: 'NestJS', icon: 'nestjs/nestjs-original.svg' },
      { name: 'Laravel', icon: 'laravel/laravel-original.svg' },
      { name: '.NET', icon: 'dot-net/dot-net-original.svg' },
      { name: 'GraphQL', icon: 'graphql/graphql-plain.svg' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Cache',
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql/postgresql-plain.svg' },
      { name: 'MySQL', icon: 'mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg' },
      { name: 'Redis', icon: 'redis/redis-original.svg' },
      { name: 'SQL Server', icon: 'microsoftsqlserver/microsoftsqlserver-original.svg' },
      { name: 'Oracle', icon: 'oracle/oracle-original.svg' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      { name: 'React', icon: 'react/react-original.svg' },
      { name: 'Angular', icon: 'angular/angular-original.svg' },
      { name: 'Next.js', icon: 'nextjs/nextjs-original.svg' },
      { name: 'React Native', icon: 'react/react-original.svg' },
      { name: 'TypeScript', icon: 'typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'javascript/javascript-original.svg' },
      { name: 'TailwindCSS', icon: 'tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', icon: 'bootstrap/bootstrap-original.svg' },
      { name: 'Sass', icon: 'sass/sass-original.svg' },
      { name: 'Figma', icon: 'figma/figma-original.svg' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    skills: [
      { name: 'Azure', icon: 'azure/azure-original.svg' },
      { name: 'Docker', icon: 'docker/docker-original.svg' },
      { name: 'Kubernetes', icon: 'kubernetes/kubernetes-plain.svg' },
      { name: 'Jenkins', icon: 'jenkins/jenkins-original.svg' },
      { name: 'GitHub Actions', icon: 'github/github-original.svg' },
      { name: 'Git', icon: 'git/git-original.svg' },
      { name: 'Linux', icon: 'linux/linux-original.svg' },
      { name: 'Postman', icon: 'postman/postman-plain.svg' },
    ],
  },
  {
    id: 'messaging',
    title: 'Message Brokers & Event Streaming',
    skills: [
      { name: 'RabbitMQ', icon: 'rabbitmq/rabbitmq-original.svg' },
      { name: 'Apache Kafka', icon: 'apachekafka/apachekafka-original.svg' },
    ],
  },
];
