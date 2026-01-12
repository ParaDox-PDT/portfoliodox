// ===========================================
// FIRESTORE SERVICE FUNCTIONS
// ===========================================

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import type {
  Profile,
  Skill,
  Experience,
  Project,
  Certificate,
  FirebaseResponse,
} from '@/types';
import { getFirestoreDb } from './firebase';

// ===========================================
// FIRESTORE UTILITIES
// ===========================================

/**
 * Convert Firestore Timestamp to JavaScript Date
 */
function convertTimestamp(value: any): any {
  if (value && typeof value === 'object') {
    if (value.constructor.name === 'Timestamp' || value.toDate) {
      return value.toDate();
    }
    if (value.seconds) {
      return new Date(value.seconds * 1000);
    }
  }
  return value;
}

/**
 * Recursively convert all Timestamps in an object to Dates
 */
function convertTimestamps(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => convertTimestamps(item));
  }

  if (typeof data === 'object') {
    const converted: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        converted[key] = convertTimestamps(convertTimestamp(data[key]));
      }
    }
    return converted;
  }

  return data;
}

/**
 * Get Firestore database instance
 * Uses centralized Firebase initialization
 */
function getDb() {
  try {
    return getFirestoreDb();
  } catch (error: any) {
    console.error('Error getting Firestore database:', error);
    throw new Error(
      `Failed to connect to Firestore: ${error.message}\n` +
      'Please check your Firebase configuration.'
    );
  }
}

// ===========================================
// COLLECTION NAMES
// ===========================================

const COLLECTIONS = {
  PROFILE: 'profile',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  CERTIFICATES: 'certificates',
} as const;

// ===========================================
// PROFILE OPERATIONS
// ===========================================

export async function getProfile(): Promise<FirebaseResponse<Profile>> {
  try {
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.PROFILE, 'main');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = convertTimestamps({ id: docSnap.id, ...docSnap.data() });
      return { data: data as Profile, error: null };
    }
    return { data: null, error: null };
  } catch (error: any) {
    console.error('Error getting profile:', error);
    return { data: null, error: error.message };
  }
}

export async function updateProfile(data: Partial<Profile>): Promise<FirebaseResponse<Profile>> {
  try {
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.PROFILE, 'main');
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    
    const updated = await getDoc(docRef);
    const convertedData = convertTimestamps({ id: updated.id, ...updated.data() });
    return { data: convertedData as Profile, error: null };
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return { data: null, error: error.message };
  }
}

// ===========================================
// SKILLS OPERATIONS
// ===========================================

export async function getSkills(): Promise<FirebaseResponse<Skill[]>> {
  try {
    const database = getDb();
    const q = query(
      collection(database, COLLECTIONS.SKILLS),
      orderBy('category'),
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    const skills = querySnapshot.docs.map(doc => {
      const data = convertTimestamps({ id: doc.id, ...doc.data() });
      return data as Skill;
    });
    
    return { data: skills, error: null };
  } catch (error: any) {
    console.error('Error getting skills:', error);
    return { data: [], error: error.message };
  }
}

export async function addSkill(data: Omit<Skill, 'id'>): Promise<FirebaseResponse<Skill>> {
  try {
    const database = getDb();
    const docRef = await addDoc(collection(database, COLLECTIONS.SKILLS), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { data: { id: docRef.id, ...data }, error: null };
  } catch (error: any) {
    console.error('Error adding skill:', error);
    return { data: null, error: error.message };
  }
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<FirebaseResponse<Skill>> {
  try {
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.SKILLS, id);
    await updateDoc(docRef, data);
    const updated = await getDoc(docRef);
    const convertedData = convertTimestamps({ id: updated.id, ...updated.data() });
    return { data: convertedData as Skill, error: null };
  } catch (error: any) {
    console.error('Error updating skill:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteSkill(id: string): Promise<FirebaseResponse<boolean>> {
  try {
    const database = getDb();
    await deleteDoc(doc(database, COLLECTIONS.SKILLS, id));
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting skill:', error);
    return { data: null, error: error.message };
  }
}

// ===========================================
// EXPERIENCE OPERATIONS
// ===========================================

export async function getExperience(): Promise<FirebaseResponse<Experience[]>> {
  try {
    const database = getDb();
    const q = query(
      collection(database, COLLECTIONS.EXPERIENCE),
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    const experience = querySnapshot.docs.map(doc => {
      const data = convertTimestamps({ id: doc.id, ...doc.data() });
      return data as Experience;
    });
    
    return { data: experience, error: null };
  } catch (error: any) {
    console.error('Error getting experience:', error);
    return { data: [], error: error.message };
  }
}

export async function addExperience(data: Omit<Experience, 'id'>): Promise<FirebaseResponse<Experience>> {
  try {
    const database = getDb();
    const docRef = await addDoc(collection(database, COLLECTIONS.EXPERIENCE), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { data: { id: docRef.id, ...data }, error: null };
  } catch (error: any) {
    console.error('Error adding experience:', error);
    return { data: null, error: error.message };
  }
}

export async function updateExperience(id: string, data: Partial<Experience>): Promise<FirebaseResponse<Experience>> {
  try {
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.EXPERIENCE, id);
    await updateDoc(docRef, data);
    const updated = await getDoc(docRef);
    const convertedData = convertTimestamps({ id: updated.id, ...updated.data() });
    return { data: convertedData as Experience, error: null };
  } catch (error: any) {
    console.error('Error updating experience:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteExperience(id: string): Promise<FirebaseResponse<boolean>> {
  try {
    const database = getDb();
    await deleteDoc(doc(database, COLLECTIONS.EXPERIENCE, id));
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting experience:', error);
    return { data: null, error: error.message };
  }
}

// ===========================================
// PROJECTS OPERATIONS
// ===========================================

export async function getProjects(): Promise<FirebaseResponse<Project[]>> {
  try {
    const database = getDb();
    const q = query(
      collection(database, COLLECTIONS.PROJECTS),
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => {
      const data = convertTimestamps({ id: doc.id, ...doc.data() });
      return data as Project;
    });
    
    return { data: projects, error: null };
  } catch (error: any) {
    console.error('Error getting projects:', error);
    return { data: [], error: error.message };
  }
}

export async function getFeaturedProjects(): Promise<FirebaseResponse<Project[]>> {
  try {
    const database = getDb();
    const q = query(
      collection(database, COLLECTIONS.PROJECTS),
      where('isFeatured', '==', true),
      orderBy('order'),
      limit(4)
    );
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => {
      const data = convertTimestamps({ id: doc.id, ...doc.data() });
      return data as Project;
    });
    
    return { data: projects, error: null };
  } catch (error: any) {
    console.error('Error getting featured projects:', error);
    return { data: [], error: error.message };
  }
}

export async function getProjectBySlug(slug: string): Promise<FirebaseResponse<Project>> {
  try {
    const database = getDb();
    const q = query(
      collection(database, COLLECTIONS.PROJECTS),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { data: null, error: 'Project not found' };
    }
    
    const docSnap = querySnapshot.docs[0];
    const convertedData = convertTimestamps({ id: docSnap.id, ...docSnap.data() });
    return { data: convertedData as Project, error: null };
  } catch (error: any) {
    console.error('Error getting project:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Check if a project slug already exists
 * @param slug - The slug to check
 * @param excludeId - Optional project ID to exclude from check (for updates)
 * @returns true if slug exists, false otherwise
 */
export async function checkSlugExists(slug: string, excludeId?: string): Promise<FirebaseResponse<boolean>> {
  try {
    const database = getDb();
    const q = query(
      collection(database, COLLECTIONS.PROJECTS),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { data: false, error: null };
    }
    
    // If checking for update, exclude the current project
    if (excludeId) {
      const existingProject = querySnapshot.docs[0];
      if (existingProject.id === excludeId) {
        return { data: false, error: null };
      }
    }
    
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error checking slug:', error);
    return { data: false, error: error.message };
  }
}

export async function getProjectById(id: string): Promise<FirebaseResponse<Project>> {
  try {
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.PROJECTS, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const convertedData = convertTimestamps({ id: docSnap.id, ...docSnap.data() });
      return { data: convertedData as Project, error: null };
    }
    return { data: null, error: 'Project not found' };
  } catch (error: any) {
    console.error('Error getting project:', error);
    return { data: null, error: error.message };
  }
}

export async function addProject(data: Omit<Project, 'id'>): Promise<FirebaseResponse<Project>> {
  try {
    // Check if slug already exists
    if (data.slug) {
      const slugCheck = await checkSlugExists(data.slug);
      if (slugCheck.error) {
        return { data: null, error: slugCheck.error };
      }
      if (slugCheck.data) {
        return { data: null, error: `A project with slug "${data.slug}" already exists. Please use a different slug.` };
      }
    }
    
    const database = getDb();
    const docRef = await addDoc(collection(database, COLLECTIONS.PROJECTS), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { data: { id: docRef.id, ...data }, error: null };
  } catch (error: any) {
    console.error('Error adding project:', error);
    return { data: null, error: error.message };
  }
}

export async function updateProject(id: string, data: Partial<Project>): Promise<FirebaseResponse<Project>> {
  try {
    // Check if slug is being changed and if it already exists
    if (data.slug) {
      const slugCheck = await checkSlugExists(data.slug, id);
      if (slugCheck.error) {
        return { data: null, error: slugCheck.error };
      }
      if (slugCheck.data) {
        return { data: null, error: `A project with slug "${data.slug}" already exists. Please use a different slug.` };
      }
    }
    
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.PROJECTS, id);
    await updateDoc(docRef, data);
    const updated = await getDoc(docRef);
    const convertedData = convertTimestamps({ id: updated.id, ...updated.data() });
    return { data: convertedData as Project, error: null };
  } catch (error: any) {
    console.error('Error updating project:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteProject(id: string): Promise<FirebaseResponse<boolean>> {
  try {
    const database = getDb();
    await deleteDoc(doc(database, COLLECTIONS.PROJECTS, id));
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return { data: null, error: error.message };
  }
}

// ===========================================
// CERTIFICATES OPERATIONS
// ===========================================

export async function getCertificates(): Promise<FirebaseResponse<Certificate[]>> {
  try {
    const database = getDb();
    const q = query(
      collection(database, COLLECTIONS.CERTIFICATES),
      orderBy('order')
    );
    const querySnapshot = await getDocs(q);
    const certificates = querySnapshot.docs.map(doc => {
      const data = convertTimestamps({ id: doc.id, ...doc.data() });
      return data as Certificate;
    });
    
    return { data: certificates, error: null };
  } catch (error: any) {
    console.error('Error getting certificates:', error);
    return { data: [], error: error.message };
  }
}

export async function addCertificate(data: Omit<Certificate, 'id'>): Promise<FirebaseResponse<Certificate>> {
  try {
    const database = getDb();
    const docRef = await addDoc(collection(database, COLLECTIONS.CERTIFICATES), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { data: { id: docRef.id, ...data }, error: null };
  } catch (error: any) {
    console.error('Error adding certificate:', error);
    return { data: null, error: error.message };
  }
}

export async function updateCertificate(id: string, data: Partial<Certificate>): Promise<FirebaseResponse<Certificate>> {
  try {
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.CERTIFICATES, id);
    await updateDoc(docRef, data);
    const updated = await getDoc(docRef);
    const convertedData = convertTimestamps({ id: updated.id, ...updated.data() });
    return { data: convertedData as Certificate, error: null };
  } catch (error: any) {
    console.error('Error updating certificate:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteCertificate(id: string): Promise<FirebaseResponse<boolean>> {
  try {
    const database = getDb();
    await deleteDoc(doc(database, COLLECTIONS.CERTIFICATES, id));
    return { data: true, error: null };
  } catch (error: any) {
    console.error('Error deleting certificate:', error);
    return { data: null, error: error.message };
  }
}
