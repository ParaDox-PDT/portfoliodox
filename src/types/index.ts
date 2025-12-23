// ===========================================
// FIREBASE DATA TYPES
// ===========================================

/**
 * Profile document - single document in 'profile' collection
 * Contains main personal information
 */
export interface Profile {
  id?: string;
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone?: string;
  location?: string;
  bio: string;
  summary: string;
  avatarUrl?: string;
  resumeUrl?: string;
  // Social links
  github?: string;
  linkedin?: string;
  telegram?: string;
  hhuz?: string;
  website?: string;
  // Stats
  yearsExperience: number;
  projectsCompleted: number;
  happyClients: number;
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  // Status
  availableForWork: boolean;
  updatedAt?: Date;
}

/**
 * Skill document in 'skills' collection
 */
export interface Skill {
  id?: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
  order: number;
  createdAt?: Date;
}

export type SkillCategory = 
  | 'mobile' 
  | 'architecture' 
  | 'backend' 
  | 'tools' 
  | 'other';

export type SkillLevel = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced' 
  | 'expert';

/**
 * Experience document in 'experience' collection
 */
export interface Experience {
  id?: string;
  company: string;
  role: string;
  location?: string;
  type: EmploymentType;
  startDate: string; // Format: YYYY-MM
  endDate?: string; // Format: YYYY-MM or null for current
  isCurrent: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
  order: number;
  createdAt?: Date;
}

export type EmploymentType = 
  | 'full-time' 
  | 'part-time' 
  | 'contract' 
  | 'freelance' 
  | 'internship';

/**
 * Project document in 'projects' collection
 */
export interface Project {
  id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: ProjectCategory;
  // Images
  thumbnailUrl?: string;
  images: string[];
  // Links
  liveUrl?: string;
  githubUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  // Tech stack
  technologies: string[];
  // Features
  features: string[];
  // Metadata
  isFeatured: boolean;
  order: number;
  startDate?: string;
  endDate?: string;
  createdAt?: Date;
}

export type ProjectCategory = 
  | 'mobile-app' 
  | 'web-app' 
  | 'package' 
  | 'open-source' 
  | 'other';

/**
 * Certificate document in 'certificates' collection
 */
export interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  issueDate: string; // Format: YYYY-MM
  expiryDate?: string; // Format: YYYY-MM or null
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  description?: string;
  skills?: string[];
  order: number;
  createdAt?: Date;
}

// ===========================================
// UI TYPES
// ===========================================

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface AdminNavItem extends NavItem {
  description?: string;
}

export interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

// ===========================================
// FIREBASE HELPERS
// ===========================================

export interface FirebaseResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  lastDoc: any;
  hasMore: boolean;
}

