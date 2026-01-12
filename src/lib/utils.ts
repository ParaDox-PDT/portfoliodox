// ===========================================
// UTILITY FUNCTIONS
// ===========================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    ...options,
  });
}

/**
 * Format date range (e.g., "Jan 2022 - Present")
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
  
  if (!endDate) {
    return `${startFormatted} - Present`;
  }
  
  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
  
  return `${startFormatted} - ${endFormatted}`;
}

/**
 * Generate slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert skill level to percentage
 */
export function skillLevelToPercent(level: string): number {
  const levels: Record<string, number> = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  };
  return levels[level] || 0;
}

/**
 * Get skill level color
 */
export function getSkillLevelColor(level: string): string {
  const colors: Record<string, string> = {
    beginner: 'bg-yellow-500',
    intermediate: 'bg-blue-500',
    advanced: 'bg-purple-500',
    expert: 'bg-primary-500',
  };
  return colors[level] || 'bg-gray-500';
}

/**
 * Get category icon name
 */
export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    mobile: 'Smartphone',
    architecture: 'Layers',
    backend: 'Server',
    tools: 'Wrench',
    other: 'Star',
  };
  return icons[category] || 'Star';
}

/**
 * Delay function for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if running on client
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if running on server
 */
export const isServer = typeof window === 'undefined';

/**
 * Get random item from array
 */
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Group array by key
 */
export function groupBy<T, K extends keyof any>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = getKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

// ===========================================
// VALIDATION FUNCTIONS
// ===========================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate date format (YYYY-MM)
 */
export function isValidDateMonth(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const [year, month] = dateString.split('-').map(Number);
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > 2100) return false;
  
  return true;
}

/**
 * Validate date range (startDate should be before endDate)
 */
export function isValidDateRange(startDate: string, endDate?: string): boolean {
  if (!endDate) return true; // No end date is valid (current position)
  
  if (!isValidDateMonth(startDate) || !isValidDateMonth(endDate)) {
    return false;
  }
  
  return startDate <= endDate;
}

/**
 * Validate slug format (lowercase, alphanumeric, hyphens)
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 1 && slug.length <= 100;
}

/**
 * Validate required field
 */
export function isRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validate string length
 */
export function isValidLength(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate project data
 */
export function validateProject(data: Partial<any>): ValidationResult {
  // Title
  if (!isRequired(data.title)) {
    return { isValid: false, error: 'Title is required' };
  }
  if (!isValidLength(data.title, 3, 200)) {
    return { isValid: false, error: 'Title must be between 3 and 200 characters' };
  }

  // Slug
  if (!isRequired(data.slug)) {
    return { isValid: false, error: 'Slug is required' };
  }
  if (!isValidSlug(data.slug)) {
    return { isValid: false, error: 'Slug must be lowercase, alphanumeric with hyphens only' };
  }

  // Short description
  if (!isRequired(data.shortDescription)) {
    return { isValid: false, error: 'Short description is required' };
  }
  if (!isValidLength(data.shortDescription, 10, 500)) {
    return { isValid: false, error: 'Short description must be between 10 and 500 characters' };
  }

  // URLs
  if (data.liveUrl && !isValidUrl(data.liveUrl)) {
    return { isValid: false, error: 'Invalid live URL format' };
  }
  if (data.githubUrl && !isValidUrl(data.githubUrl)) {
    return { isValid: false, error: 'Invalid GitHub URL format' };
  }
  if (data.playStoreUrl && !isValidUrl(data.playStoreUrl)) {
    return { isValid: false, error: 'Invalid Play Store URL format' };
  }
  if (data.appStoreUrl && !isValidUrl(data.appStoreUrl)) {
    return { isValid: false, error: 'Invalid App Store URL format' };
  }

  return { isValid: true };
}

/**
 * Validate profile data
 */
export function validateProfile(data: Partial<any>): ValidationResult {
  // Name
  if (!isRequired(data.name)) {
    return { isValid: false, error: 'Name is required' };
  }
  if (!isValidLength(data.name, 2, 100)) {
    return { isValid: false, error: 'Name must be between 2 and 100 characters' };
  }

  // Email
  if (!isRequired(data.email)) {
    return { isValid: false, error: 'Email is required' };
  }
  if (!isValidEmail(data.email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Bio
  if (!isRequired(data.bio)) {
    return { isValid: false, error: 'Bio is required' };
  }
  if (!isValidLength(data.bio, 50, 2000)) {
    return { isValid: false, error: 'Bio must be between 50 and 2000 characters' };
  }

  // URLs
  if (data.github && !isValidUrl(data.github)) {
    return { isValid: false, error: 'Invalid GitHub URL format' };
  }
  if (data.linkedin && !isValidUrl(data.linkedin)) {
    return { isValid: false, error: 'Invalid LinkedIn URL format' };
  }
  if (data.website && !isValidUrl(data.website)) {
    return { isValid: false, error: 'Invalid website URL format' };
  }

  return { isValid: true };
}

/**
 * Validate experience data
 */
export function validateExperience(data: Partial<any>): ValidationResult {
  // Company
  if (!isRequired(data.company)) {
    return { isValid: false, error: 'Company name is required' };
  }
  if (!isValidLength(data.company, 2, 100)) {
    return { isValid: false, error: 'Company name must be between 2 and 100 characters' };
  }

  // Role
  if (!isRequired(data.role)) {
    return { isValid: false, error: 'Role is required' };
  }
  if (!isValidLength(data.role, 2, 100)) {
    return { isValid: false, error: 'Role must be between 2 and 100 characters' };
  }

  // Start date
  if (!isRequired(data.startDate)) {
    return { isValid: false, error: 'Start date is required' };
  }
  if (!isValidDateMonth(data.startDate)) {
    return { isValid: false, error: 'Start date must be in YYYY-MM format' };
  }

  // End date (if provided)
  if (data.endDate && !isValidDateMonth(data.endDate)) {
    return { isValid: false, error: 'End date must be in YYYY-MM format' };
  }

  // Date range
  if (!isValidDateRange(data.startDate, data.endDate)) {
    return { isValid: false, error: 'Start date must be before or equal to end date' };
  }

  // Description
  if (!isRequired(data.description)) {
    return { isValid: false, error: 'Description is required' };
  }
  if (!isValidLength(data.description, 20, 2000)) {
    return { isValid: false, error: 'Description must be between 20 and 2000 characters' };
  }

  return { isValid: true };
}

/**
 * Validate skill data
 */
export function validateSkill(data: Partial<any>): ValidationResult {
  // Name
  if (!isRequired(data.name)) {
    return { isValid: false, error: 'Skill name is required' };
  }
  if (!isValidLength(data.name, 1, 50)) {
    return { isValid: false, error: 'Skill name must be between 1 and 50 characters' };
  }

  // Category
  const validCategories = ['mobile', 'architecture', 'backend', 'tools', 'other'];
  if (!data.category || !validCategories.includes(data.category)) {
    return { isValid: false, error: 'Invalid skill category' };
  }

  // Level
  const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
  if (!data.level || !validLevels.includes(data.level)) {
    return { isValid: false, error: 'Invalid skill level' };
  }

  return { isValid: true };
}

/**
 * Validate certificate data
 */
export function validateCertificate(data: Partial<any>): ValidationResult {
  // Title
  if (!isRequired(data.title)) {
    return { isValid: false, error: 'Certificate title is required' };
  }
  if (!isValidLength(data.title, 3, 200)) {
    return { isValid: false, error: 'Title must be between 3 and 200 characters' };
  }

  // Issuer
  if (!isRequired(data.issuer)) {
    return { isValid: false, error: 'Issuer is required' };
  }
  if (!isValidLength(data.issuer, 2, 100)) {
    return { isValid: false, error: 'Issuer must be between 2 and 100 characters' };
  }

  // Issue date
  if (!isRequired(data.issueDate)) {
    return { isValid: false, error: 'Issue date is required' };
  }
  if (!isValidDateMonth(data.issueDate)) {
    return { isValid: false, error: 'Issue date must be in YYYY-MM format' };
  }

  // Credential URL (if provided)
  if (data.credentialUrl && !isValidUrl(data.credentialUrl)) {
    return { isValid: false, error: 'Invalid credential URL format' };
  }

  return { isValid: true };
}
