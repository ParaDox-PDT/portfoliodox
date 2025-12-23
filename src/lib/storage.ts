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
  getStorage,
  FirebaseStorage,
} from 'firebase/storage';
import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseResponse } from '@/types';
import { firebaseConfig } from './firebase';

// ===========================================
// STORAGE INITIALIZATION
// ===========================================

let storage: FirebaseStorage | null = null;

function getStorageInstance(): FirebaseStorage | null {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!storage) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    storage = getStorage(app);
  }
  return storage;
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
  path: string
): Promise<FirebaseResponse<string>> {
  try {
    const storageInstance = getStorageInstance();
    if (!storageInstance) return { data: null, error: 'Storage not available' };
    
    const storageRef = ref(storageInstance, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { data: downloadURL, error: null };
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return { data: null, error: error.message };
  }
}

export async function uploadProfileImage(file: File): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const path = `${STORAGE_PATHS.PROFILE}/avatar.${extension}`;
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
  const path = `${STORAGE_PATHS.PROJECTS}/${projectId}/thumbnail.${extension}`;
  return uploadFile(file, path);
}

export async function uploadCertificateImage(
  certificateId: string,
  file: File
): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const path = `${STORAGE_PATHS.CERTIFICATES}/${certificateId}/image.${extension}`;
  return uploadFile(file, path);
}

export async function uploadCompanyLogo(
  experienceId: string,
  file: File
): Promise<FirebaseResponse<string>> {
  const extension = file.name.split('.').pop();
  const path = `${STORAGE_PATHS.EXPERIENCE}/${experienceId}/logo.${extension}`;
  return uploadFile(file, path);
}

// ===========================================
// DELETE FUNCTIONS
// ===========================================

export async function deleteFile(url: string): Promise<FirebaseResponse<boolean>> {
  try {
    const storageInstance = getStorageInstance();
    if (!storageInstance) return { data: null, error: 'Storage not available' };
    
    let path = url;
    if (url.includes('firebasestorage.googleapis.com')) {
      const matches = url.match(/o\/(.+?)\?/);
      if (matches) {
        path = decodeURIComponent(matches[1]);
      }
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
