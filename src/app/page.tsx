'use client';

// ===========================================
// HOME PAGE (CLIENT-SIDE DATA FETCHING WITH LOADING STATE)
// ===========================================

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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

export default function HomePage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const scrollRestored = useRef(false);

  // Save scroll position on scroll
  useEffect(() => {
    if (pathname !== '/') return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  // Restore scroll position when navigating back to home page
  useEffect(() => {
    if (pathname !== '/' || loading) return;

    const restoreScroll = () => {
      if (window.location.hash) {
        requestAnimationFrame(() => {
          document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
        });
        scrollRestored.current = true;
        return;
      }
      const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
      if (savedScrollPosition && !scrollRestored.current) {
        const position = parseInt(savedScrollPosition, 10);
        if (position > 0) {
          const tryRestore = (attempt = 0) => {
            if (attempt > 5) {
              scrollRestored.current = true;
              return;
            }

            requestAnimationFrame(() => {
              const currentScroll = window.scrollY;
              if (currentScroll === 0 || attempt === 0) {
                window.scrollTo({
                  top: position,
                  behavior: 'auto',
                });
                
                setTimeout(() => {
                  if (Math.abs(window.scrollY - position) < 10) {
                    scrollRestored.current = true;
                  } else if (attempt < 5) {
                    tryRestore(attempt + 1);
                  } else {
                    scrollRestored.current = true;
                  }
                }, 50);
              } else {
                scrollRestored.current = true;
              }
            });
          };

          tryRestore();
        } else {
          scrollRestored.current = true;
        }
      } else {
        scrollRestored.current = true;
      }
    };

    scrollRestored.current = false;
    restoreScroll();
  }, [pathname, loading]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/') {
        scrollRestored.current = false;
        
        setTimeout(() => {
          const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
          if (savedScrollPosition) {
            const position = parseInt(savedScrollPosition, 10);
            if (position > 0) {
              const attempts = [50, 100, 200, 300, 500];
              attempts.forEach((delay, index) => {
                setTimeout(() => {
                  if (!scrollRestored.current) {
                    requestAnimationFrame(() => {
                      window.scrollTo({
                        top: position,
                        behavior: 'auto',
                      });
                      
                      setTimeout(() => {
                        if (Math.abs(window.scrollY - position) < 10) {
                          scrollRestored.current = true;
                        } else if (index === attempts.length - 1) {
                          scrollRestored.current = true;
                        }
                      }, 50);
                    });
                  }
                }, delay);
              });
            } else {
              scrollRestored.current = true;
            }
          } else {
            scrollRestored.current = true;
          }
        }, 10);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch real data from Firebase on mount
  useEffect(() => {
    async function fetchData() {
      try {
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

        setProfile(profileRes.data || mockProfile);
        setSkills(skillsRes.data && skillsRes.data.length > 0 ? skillsRes.data : mockSkills);
        setExperience(experienceRes.data && experienceRes.data.length > 0 ? experienceRes.data : mockExperience);
        setProjects(projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data : mockProjects);
        setCertificates(certificatesRes.data && certificatesRes.data.length > 0 ? certificatesRes.data : mockCertificates);
      } catch (error) {
        console.error('Unexpected error fetching data:', error);
        setProfile(mockProfile);
        setSkills(mockSkills);
        setExperience(mockExperience);
        setProjects(mockProjects);
        setCertificates(mockCertificates);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading state while real data is arriving from Firebase (No fake data flash)
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] text-zinc-100">
        <div className="relative flex flex-col items-center gap-6">
          {/* Glowing brand emblem with actual logo */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2.5 shadow-[0_0_35px_rgba(6,182,212,0.25)]">
            <Image
              src="/logo.png"
              alt="PortfolioDox"
              width={42}
              height={42}
              className="object-contain"
              priority
            />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
            </span>
          </div>

          {/* Title & subtle loading pulse bar */}
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-sm font-medium tracking-wider text-zinc-200">
              PortfolioDox
            </span>
            <div className="relative h-1 w-36 overflow-hidden rounded-full bg-zinc-800">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar name={profile?.name} />
      
      <main id="main-content" className="portfolio-main">
        {profile && <HeroSection profile={profile} />}
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={projects} />
        <CertificatesSection certificates={certificates} />
        <SkillsSection skills={skills} />
        {profile && <AboutSection profile={profile} />}
        {profile && <ContactSection profile={profile} />}
      </main>

      {profile && <Footer profile={profile} />}
    </>
  );
}
