// ===========================================
// MOCK DATA FOR DEVELOPMENT
// ===========================================

import type { Profile, Skill, Experience, Project, Certificate } from '@/types';

export const mockProfile: Profile = {
  id: 'mock-profile',
  name: 'John Doe',
  title: 'Flutter Developer',
  subtitle: '3 year experience',
  email: 'hello@example.com',
  phone: '+1 234 567 890',
  location: 'Tashkent, Uzbekistan',
  bio: `Over the past 3+ years, I've had the privilege of working with startups and established companies to build production-grade mobile applications used by thousands of users daily.

My approach combines technical excellence with a deep understanding of user needs. I believe that great apps aren't just about clean code—they're about solving real problems and delivering genuine value.`,
  summary: '3+ years crafting high-performance mobile applications for startups and enterprises worldwide. Specializing in clean architecture, beautiful UIs, and seamless user experiences.',
  avatarUrl: '',
  resumeUrl: '',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  telegram: 'https://t.me',
  hhuz: 'https://hh.uz',
  website: '',
  yearsExperience: 3,
  projectsCompleted: 15,
  happyClients: 10,
  availableForWork: true,
};

export const mockSkills: Skill[] = [
  // Mobile
  { id: '1', name: 'Flutter', category: 'mobile', level: 'expert', order: 0 },
  { id: '2', name: 'Dart', category: 'mobile', level: 'expert', order: 1 },
  { id: '3', name: 'Android (Kotlin)', category: 'mobile', level: 'advanced', order: 2 },
  { id: '4', name: 'iOS (Swift)', category: 'mobile', level: 'intermediate', order: 3 },
  
  // Architecture
  { id: '5', name: 'Clean Architecture', category: 'architecture', level: 'expert', order: 0 },
  { id: '6', name: 'BLoC Pattern', category: 'architecture', level: 'expert', order: 1 },
  { id: '7', name: 'Provider', category: 'architecture', level: 'advanced', order: 2 },
  { id: '8', name: 'GetX', category: 'architecture', level: 'advanced', order: 3 },
  { id: '9', name: 'Riverpod', category: 'architecture', level: 'advanced', order: 4 },
  
  // Backend
  { id: '10', name: 'Firebase', category: 'backend', level: 'expert', order: 0 },
  { id: '11', name: 'REST APIs', category: 'backend', level: 'expert', order: 1 },
  { id: '12', name: 'GraphQL', category: 'backend', level: 'advanced', order: 2 },
  { id: '13', name: 'WebSocket', category: 'backend', level: 'advanced', order: 3 },
  { id: '14', name: 'Node.js', category: 'backend', level: 'intermediate', order: 4 },
  
  // Tools
  { id: '15', name: 'Git', category: 'tools', level: 'expert', order: 0 },
  { id: '16', name: 'CI/CD', category: 'tools', level: 'advanced', order: 1 },
  { id: '17', name: 'Figma', category: 'tools', level: 'advanced', order: 2 },
  { id: '18', name: 'Postman', category: 'tools', level: 'advanced', order: 3 },
];

export const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'TechStartup Inc.',
    role: 'Senior Flutter Developer',
    location: 'San Francisco, CA (Remote)',
    type: 'full-time',
    startDate: '2022-06',
    endDate: '',
    isCurrent: true,
    description: 'Leading the mobile development team to build and maintain the company\'s flagship fintech application with over 100K active users.',
    achievements: [
      'Increased app performance by 40% through optimization',
      'Led migration from Provider to BLoC architecture',
      'Mentored 3 junior developers',
    ],
    technologies: ['Flutter', 'Dart', 'Firebase', 'BLoC', 'GraphQL'],
    order: 0,
  },
  {
    id: '2',
    company: 'Digital Agency',
    role: 'Flutter Developer',
    location: 'New York, NY',
    type: 'full-time',
    startDate: '2021-01',
    endDate: '2022-05',
    isCurrent: false,
    description: 'Developed multiple cross-platform mobile applications for various clients in e-commerce and healthcare sectors.',
    achievements: [
      'Delivered 5+ apps to production',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Built reusable component library used across projects',
    ],
    technologies: ['Flutter', 'Dart', 'REST API', 'Provider', 'SQLite'],
    order: 1,
  },
  {
    id: '3',
    company: 'Freelance',
    role: 'Mobile Developer',
    location: 'Remote',
    type: 'freelance',
    startDate: '2020-03',
    endDate: '2020-12',
    isCurrent: false,
    description: 'Worked with multiple startups to build MVPs and help them launch their mobile products.',
    achievements: [
      'Successfully launched 3 MVP apps',
      'Maintained 5-star average rating on Upwork',
    ],
    technologies: ['Flutter', 'Firebase', 'Android', 'iOS'],
    order: 2,
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'FinTrack Pro',
    slug: 'fintrack-pro',
    shortDescription: 'A comprehensive personal finance management app with AI-powered insights and budget tracking.',
    fullDescription: `FinTrack Pro is a comprehensive personal finance management application that helps users track their expenses, manage budgets, and achieve their financial goals.

Key features include:
- AI-powered spending insights
- Automatic transaction categorization
- Budget planning and tracking
- Bill reminders and notifications
- Multiple account support
- Data export and reports`,
    category: 'mobile-app',
    thumbnailUrl: '',
    images: [],
    liveUrl: '',
    githubUrl: 'https://github.com',
    playStoreUrl: 'https://play.google.com',
    appStoreUrl: '',
    technologies: ['Flutter', 'Firebase', 'BLoC', 'ML Kit', 'Charts'],
    features: [
      'Real-time expense tracking',
      'AI-powered spending insights',
      'Budget planning tools',
      'Bank account integration',
      'Data visualization',
    ],
    isFeatured: true,
    order: 0,
  },
  {
    id: '2',
    title: 'HealthMate',
    slug: 'healthmate',
    shortDescription: 'Healthcare appointment booking app with telemedicine features and health record management.',
    fullDescription: `HealthMate is a comprehensive healthcare application that connects patients with healthcare providers, enabling easy appointment booking and telemedicine consultations.`,
    category: 'mobile-app',
    thumbnailUrl: '',
    images: [],
    liveUrl: '',
    githubUrl: 'https://github.com',
    playStoreUrl: 'https://play.google.com',
    appStoreUrl: 'https://apps.apple.com',
    technologies: ['Flutter', 'Firebase', 'WebRTC', 'Stripe', 'GetX'],
    features: [
      'Doctor search and booking',
      'Video consultations',
      'Health records management',
      'Prescription tracking',
    ],
    isFeatured: true,
    order: 1,
  },
  {
    id: '3',
    title: 'TaskFlow',
    slug: 'taskflow',
    shortDescription: 'Team collaboration and project management tool with real-time updates and Kanban boards.',
    fullDescription: `TaskFlow is a powerful team collaboration tool designed for modern teams. It features real-time synchronization, Kanban boards, and seamless team communication.`,
    category: 'mobile-app',
    thumbnailUrl: '',
    images: [],
    liveUrl: '',
    githubUrl: 'https://github.com',
    playStoreUrl: '',
    appStoreUrl: '',
    technologies: ['Flutter', 'Firebase', 'Riverpod', 'WebSocket'],
    features: [
      'Kanban boards',
      'Real-time collaboration',
      'File sharing',
      'Team chat',
    ],
    isFeatured: true,
    order: 2,
  },
  {
    id: '4',
    title: 'Flutter Starter Kit',
    slug: 'flutter-starter-kit',
    shortDescription: 'Open-source Flutter project template with clean architecture, authentication, and common features.',
    fullDescription: `A production-ready Flutter starter kit that includes clean architecture setup, authentication flow, theming, localization, and other common features.`,
    category: 'open-source',
    thumbnailUrl: '',
    images: [],
    liveUrl: '',
    githubUrl: 'https://github.com',
    playStoreUrl: '',
    appStoreUrl: '',
    technologies: ['Flutter', 'BLoC', 'Clean Architecture', 'Dio', 'Hive'],
    features: [
      'Clean architecture setup',
      'Authentication flow',
      'Dark/Light theme',
      'Localization support',
    ],
    isFeatured: true,
    order: 3,
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Google Associate Android Developer',
    issuer: 'Google',
    issueDate: '2023-06',
    credentialId: 'GAD-2023-XXXXX',
    credentialUrl: 'https://google.com',
    description: 'Certification demonstrating proficiency in Android development using Kotlin.',
    skills: ['Android', 'Kotlin', 'Material Design'],
    order: 0,
  },
  {
    id: '2',
    title: 'Firebase Expert',
    issuer: 'Google Cloud',
    issueDate: '2023-02',
    credentialId: 'FBE-2023-XXXXX',
    credentialUrl: 'https://google.com',
    description: 'Advanced certification for Firebase services and best practices.',
    skills: ['Firebase', 'Cloud Functions', 'Firestore'],
    order: 1,
  },
  {
    id: '3',
    title: 'Flutter Development Bootcamp',
    issuer: 'App Academy',
    issueDate: '2021-08',
    credentialId: 'FDB-2021-XXXXX',
    credentialUrl: 'https://example.com',
    description: 'Comprehensive Flutter development training covering advanced topics.',
    skills: ['Flutter', 'Dart', 'State Management'],
    order: 2,
  },
];

