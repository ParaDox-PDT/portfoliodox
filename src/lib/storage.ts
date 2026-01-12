// ===========================================
// FIREBASE STORAGE SERVICE (CLIENT-SIDE ONLY)
// ===========================================

'use client';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import type { FirebaseResponse } from '@/types';
import { getFirebaseStorage } from './firebase';

// ===========================================
// STORAGE INITIALIZATION
// ===========================================

function getStorageInstance() {
  return getFirebaseStorage();
}

// ===========================================
// STORAGE PATHS
// ===========================================

const STORAGE_PATHS = {
  PROFILE: 'profile',
  PROJECTS: 'projects',
  CERTIFICATES: 'certificates',
  EXPERIENCE: 'experience',
} as const;

// ===========================================
// UPLOAD FUNCTIONS
// ===========================================

export async function uploadFile(
  file: File,
  path: string,
  optimize: boolean = true
): Promise<FirebaseResponse<string>> {
  try {
    const storageInstance = getStorageInstance();
    if (!storageInstance) return { data: null, error: 'Storage not available' };
    
    // Optimize image if it's an image file
    let fileToUpload = file;
    if (optimize && file.type.startsWith('image/')) {
      const optimization = await optimizeImageForUpload(file);
      if (optimization.error) {
        return { data: null, error: optimization.error };
      }
      fileToUpload = optimization.data!;
    }
    
    const storageRef = ref(storageInstance, path);
    const snapshot = await uploadBytes(storageRef, fileToUpload);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { data: downloadURL, error: null };
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return { data: null, error: error.message };
  }
}

export async function uploadProfileImage(file: File): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const timestamp = Date.now();
  // Use timestamped filename to avoid overwriting, but keep it in profile folder
  const path = `${STORAGE_PATHS.PROFILE}/avatar-${timestamp}.${extension}`;
  return uploadFile(file, path);
}

export async function uploadResume(file: File): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const path = `${STORAGE_PATHS.PROFILE}/resume.${extension}`;
  return uploadFile(file, path);
}

export async function uploadProjectImage(
  projectId: string,
  file: File,
  index: number = 0
): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const timestamp = Date.now();
  const path = `${STORAGE_PATHS.PROJECTS}/${projectId}/${timestamp}-${index}.${extension}`;
  return uploadFile(file, path);
}

export async function uploadProjectThumbnail(
  projectId: string,
  file: File
): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const timestamp = Date.now();
  // Use timestamped filename for versioning
  const path = `${STORAGE_PATHS.PROJECTS}/${projectId}/thumbnail-${timestamp}.${extension}`;
  return uploadFile(file, path);
}

export async function uploadCertificateImage(
  certificateId: string,
  file: File
): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const timestamp = Date.now();
  // Use timestamped filename for versioning
  const path = `${STORAGE_PATHS.CERTIFICATES}/${certificateId}/image-${timestamp}.${extension}`;
  return uploadFile(file, path);
}

export async function uploadCompanyLogo(
  experienceId: string,
  file: File
): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const timestamp = Date.now();
  // Use timestamped filename for versioning
  const path = `${STORAGE_PATHS.EXPERIENCE}/${experienceId}/logo-${timestamp}.${extension}`;
  return uploadFile(file, path);
}

// ===========================================
// DELETE FUNCTIONS
// ===========================================

/**
 * Extract storage path from Firebase Storage URL
 * Handles multiple URL formats:
 * - https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token=...
 * - https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{encodedPath}?alt=media
 * - gs://{bucket}/{path}
 * - Direct path
 */
function extractStoragePath(url: string): string | null {
  // If it's already a path (not a URL), return as is
  if (!url.includes('://')) {
    return url;
  }

  // Handle gs:// URLs
  if (url.startsWith('gs://')) {
    const parts = url.replace('gs://', '').split('/');
    if (parts.length < 2) return null;
    return parts.slice(1).join('/');
  }

  // Handle https://firebasestorage.googleapis.com URLs
  if (url.includes('firebasestorage.googleapis.com')) {
    // Pattern 1: /o/{path}?alt=media
    let matches = url.match(/\/o\/([^?]+)/);
    if (matches) {
      try {
        return decodeURIComponent(matches[1]);
      } catch {
        return matches[1];
      }
    }

    // Pattern 2: /v0/b/{bucket}/o/{path}?alt=media
    matches = url.match(/\/v0\/b\/[^/]+\/o\/([^?]+)/);
    if (matches) {
      try {
        return decodeURIComponent(matches[1]);
      } catch {
        return matches[1];
      }
    }
  }

  return null;
}

export async function deleteFile(url: string): Promise<FirebaseResponse<boolean>> {
  try {
    const storageInstance = getStorageInstance();
    if (!storageInstance) return { data: null, error: 'Storage not available' };
    
    const path = extractStoragePath(url);
    if (!path) {
      return { data: null, error: 'Invalid storage URL format' };
    }
    
    const storageRef = ref(storageInstance, path);
    await deleteObject(storageRef);
    
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteFolder(folderPath: string): Promise<FirebaseResponse<boolean>> {
  try {
    const storageInstance = getStorageInstance();
    if (!storageInstance) return { data: null, error: 'Storage not available' };
    
    const folderRef = ref(storageInstance, folderPath);
    const listResult = await listAll(folderRef);
    
    const deletePromises = listResult.items.map(item => deleteObject(item));
    await Promise.all(deletePromises);
    
    const folderDeletePromises = listResult.prefixes.map(prefix => 
      deleteFolder(prefix.fullPath)
    );
    await Promise.all(folderDeletePromises);
    
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting folder:', error);
    return { data: null, error: error.message };
  }
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

export function generateUniqueFilename(originalName: string): string {
  const extension = originalName.split('.').pop();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${extension}`;
}

export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Compress image file before upload
 * Reduces file size while maintaining quality
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    // Only compress images
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Image compression failed'));
              return;
            }

            // Create new file with compressed data
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Optimize image before upload
 * Validates, compresses, and returns optimized file
 */
export async function optimizeImageForUpload(
  file: File,
  options: {
    maxSizeMB?: number;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {}
): Promise<FirebaseResponse<File>> {
  try {
    const {
      maxSizeMB = 5,
      maxWidth = 1920,
      maxHeight = 1080,
      quality = 0.8,
    } = options;

    // Validate file type
    if (!validateFileType(file, ALLOWED_IMAGE_TYPES)) {
      return {
        data: null,
        error: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
      };
    }

    // If file is already small enough, return as is
    if (file.size <= maxSizeMB * 1024 * 1024) {
      return { data: file, error: null };
    }

    // Compress image
    const compressedFile = await compressImage(file, maxWidth, maxHeight, quality);

    // Check if compression helped
    if (compressedFile.size > maxSizeMB * 1024 * 1024) {
      return {
        data: null,
        error: `Image is too large. Maximum size: ${maxSizeMB}MB`,
      };
    }

    return { data: compressedFile, error: null };
  } catch (error: any) {
    console.error('Error optimizing image:', error);
    return { data: null, error: error.message || 'Failed to optimize image' };
  }
}

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
