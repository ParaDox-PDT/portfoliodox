'use client';

// ===========================================
// PROJECT DETAIL PAGE (CLIENT-SIDE)
// ===========================================

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Download, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Badge, Button } from '@/components/ui';
import { getProjectBySlug, getProfile } from '@/lib/firestore';
import type { Profile, Project } from '@/types';

// ===========================================
// PAGE COMPONENT
// ===========================================

export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      
      try {
        const [projectRes, profileRes] = await Promise.all([
          getProjectBySlug(slug),
          getProfile(),
        ]);

        setProject(projectRes.data);
        setProfile(profileRes.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link href="/#projects">
              <Button>Back to Projects</Button>
            </Link>
          </div>
        </main>
        <Footer profile={profile} />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="mb-8">
            <Badge variant="primary" size="lg" className="mb-4">
              {project.category.replace('-', ' ')}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {project.shortDescription}
            </p>
          </div>

          {/* Main Image */}
          {project.thumbnailUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-card mb-8">
              <Image
                src={project.thumbnailUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" rightIcon={<ExternalLink className="w-4 h-4" />}>
                  Live Demo
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" leftIcon={<Github className="w-4 h-4" />}>
                  View Code
                </Button>
              </a>
            )}
            {project.playStoreUrl && (
              <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" leftIcon={<Download className="w-4 h-4" />}>
                  Play Store
                </Button>
              </a>
            )}
            {project.appStoreUrl && (
              <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="lg" leftIcon={<Download className="w-4 h-4" />}>
                  App Store
                </Button>
              </a>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About This Project
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                  {project.fullDescription || project.shortDescription}
                </p>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h2>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Gallery
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-card"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Technologies */}
                <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-2xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="default" size="lg">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    Interested in working together?
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    Let's discuss how I can help bring your ideas to life.
                  </p>
                  <Link href="/#contact">
                    <Button
                      variant="ghost"
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer profile={profile} />
    </>
  );
}
