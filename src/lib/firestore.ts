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
  getFirestore,
  Firestore,
  initializeFirestore,
} from 'firebase/firestore';
import type {
  Profile,
  Skill,
  Experience,
  Project,
  Certificate,
  FirebaseResponse,
} from '@/types';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';

// ===========================================
// FIREBASE INITIALIZATION
// ===========================================

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  }
  return firebaseApp;
}

function getDb(): Firestore {
  if (!firestoreDb) {
    const app = getFirebaseApp();
    firestoreDb = getFirestore(app);
  }
  return firestoreDb;
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
      return { data: { id: docSnap.id, ...docSnap.data() } as Profile, error: null };
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
    return { data: { id: updated.id, ...updated.data() } as Profile, error: null };
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
    const skills = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Skill[];
    
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
    return { data: { id: updated.id, ...updated.data() } as Skill, error: null };
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
    const experience = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Experience[];
    
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
    return { data: { id: updated.id, ...updated.data() } as Experience, error: null };
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
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    
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
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    
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
    return { data: { id: docSnap.id, ...docSnap.data() } as Project, error: null };
  } catch (error: any) {
    console.error('Error getting project:', error);
    return { data: null, error: error.message };
  }
}

export async function getProjectById(id: string): Promise<FirebaseResponse<Project>> {
  try {
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.PROJECTS, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() } as Project, error: null };
    }
    return { data: null, error: 'Project not found' };
  } catch (error: any) {
    console.error('Error getting project:', error);
    return { data: null, error: error.message };
  }
}

export async function addProject(data: Omit<Project, 'id'>): Promise<FirebaseResponse<Project>> {
  try {
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
    const database = getDb();
    const docRef = doc(database, COLLECTIONS.PROJECTS, id);
    await updateDoc(docRef, data);
    const updated = await getDoc(docRef);
    return { data: { id: updated.id, ...updated.data() } as Project, error: null };
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
    const certificates = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Certificate[];
    
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
    return { data: { id: updated.id, ...updated.data() } as Certificate, error: null };
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
