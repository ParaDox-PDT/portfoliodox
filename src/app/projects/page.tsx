"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { getProjects, getProfile } from "@/lib/firestore";
import type { Profile, Project } from "@/types";
export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    let active = true;
    async function fetchData() {
      try {
        const [projectsRes, profileRes] = await Promise.all([
          getProjects(),
          getProfile(),
        ]);
        if (!active) return;
        const sorted = [...(projectsRes.data || [])].sort(
          (a, b) =>
            Number(b.isFeatured) - Number(a.isFeatured) ||
            (a.order || 0) - (b.order || 0),
        );
        setProjects(sorted);
        setProfile(profileRes.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchData();
    return () => {
      active = false;
    };
  }, []);
  return (
    <>
      <Navbar name={profile?.name} />
      <main
        id="main-content"
        className="portfolio-main pt-20"
        aria-busy={loading}
      >
        {loading ? (
          <div
            role="status"
            className="portfolio-container py-32 text-gray-400"
          >
            Loading projects…
          </div>
        ) : (
          <ProjectsSection projects={projects} allProjects />
        )}
      </main>
      <Footer profile={profile} />
    </>
  );
}
