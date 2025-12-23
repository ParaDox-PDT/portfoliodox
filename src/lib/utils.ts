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

