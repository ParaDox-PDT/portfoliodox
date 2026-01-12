'use client';

// ===========================================
// HOME PAGE (CLIENT-SIDE DATA FETCHING)
// ===========================================

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  CertificatesSection,
  ContactSection,
} from '@/components/sections';
import {
  getProfile,
  getSkills,
  getExperience,
  getProjects,
  getCertificates,
} from '@/lib/firestore';
import {
  mockProfile,
  mockSkills,
  mockExperience,
  mockProjects,
  mockCertificates,
} from '@/lib/mockData';
import type { Profile, Skill, Experience, Project, Certificate } from '@/types';
import { Loader2 } from 'lucide-react';

// ===========================================
// PAGE COMPONENT
// ===========================================

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Try to fetch from Firebase
        const [profileRes, skillsRes, experienceRes, projectsRes, certificatesRes] = await Promise.all([
          getProfile().catch((err) => {
            console.error('Error fetching profile:', err);
            return { data: null, error: err.message || 'Failed to fetch profile' };
          }),
          getSkills().catch((err) => {
            console.error('Error fetching skills:', err);
            return { data: [], error: err.message || 'Failed to fetch skills' };
          }),
          getExperience().catch((err) => {
            console.error('Error fetching experience:', err);
            return { data: [], error: err.message || 'Failed to fetch experience' };
          }),
          getProjects().catch((err) => {
            console.error('Error fetching projects:', err);
            return { data: [], error: err.message || 'Failed to fetch projects' };
          }),
          getCertificates().catch((err) => {
            console.error('Error fetching certificates:', err);
            return { data: [], error: err.message || 'Failed to fetch certificates' };
          }),
        ]);

        // Check if we're in development mode
        const isDevelopment = process.env.NODE_ENV === 'development';

        // Use Firebase data if available
        // In production, show empty state if no data
        // In development, fallback to mock data for easier testing
        if (profileRes.data) {
          setProfile(profileRes.data);
        } else if (isDevelopment) {
          setProfile(mockProfile);
        } else {
          setProfile(null);
        }

        if (skillsRes.data && skillsRes.data.length > 0) {
          setSkills(skillsRes.data);
        } else if (isDevelopment) {
          setSkills(mockSkills);
        } else {
          setSkills([]);
        }

        if (experienceRes.data && experienceRes.data.length > 0) {
          setExperience(experienceRes.data);
        } else if (isDevelopment) {
          setExperience(mockExperience);
        } else {
          setExperience([]);
        }

        if (projectsRes.data && projectsRes.data.length > 0) {
          setProjects(projectsRes.data);
        } else if (isDevelopment) {
          setProjects(mockProjects);
        } else {
          setProjects([]);
        }

        if (certificatesRes.data && certificatesRes.data.length > 0) {
          setCertificates(certificatesRes.data);
        } else if (isDevelopment) {
          setCertificates(mockCertificates);
        } else {
          setCertificates([]);
        }
      } catch (error: any) {
        console.error('Unexpected error fetching data:', error);
        // Only use mock data in development
        if (process.env.NODE_ENV === 'development') {
          setProfile(mockProfile);
          setSkills(mockSkills);
          setExperience(mockExperience);
          setProjects(mockProjects);
          setCertificates(mockCertificates);
        }
      } finally {
        setLoading(false);
      }
    }

    // Add a small delay to prevent hydration issues
    const timer = setTimeout(() => {
      fetchData();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Don't show loading spinner - IntroLoader handles initial loading
  // Only show content when data is ready
  if (loading) {
    return null;
  }

  return (
    <>
      <Navbar name={profile?.name} />
      
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={projects} />
        <CertificatesSection certificates={certificates} />
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
    </>
  );
}
