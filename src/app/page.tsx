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
          getProfile().catch(() => ({ data: null, error: 'Failed' })),
          getSkills().catch(() => ({ data: [], error: 'Failed' })),
          getExperience().catch(() => ({ data: [], error: 'Failed' })),
          getProjects().catch(() => ({ data: [], error: 'Failed' })),
          getCertificates().catch(() => ({ data: [], error: 'Failed' })),
        ]);

        // Use Firebase data if available, otherwise use mock data
        setProfile(profileRes.data || mockProfile);
        setSkills(skillsRes.data && skillsRes.data.length > 0 ? skillsRes.data : mockSkills);
        setExperience(experienceRes.data && experienceRes.data.length > 0 ? experienceRes.data : mockExperience);
        setProjects(projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data : mockProjects);
        setCertificates(certificatesRes.data && certificatesRes.data.length > 0 ? certificatesRes.data : mockCertificates);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use mock data on error
        setProfile(mockProfile);
        setSkills(mockSkills);
        setExperience(mockExperience);
        setProjects(mockProjects);
        setCertificates(mockCertificates);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
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
