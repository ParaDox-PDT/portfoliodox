'use client';

// ===========================================
// PROJECT DETAIL PAGE (CLIENT-SIDE)
// ===========================================

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Download, Loader2, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (selectedImageIndex === null || !project?.images) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex(
          selectedImageIndex > 0
            ? selectedImageIndex - 1
            : project.images.length - 1
        );
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex(
          selectedImageIndex < project.images.length - 1
            ? selectedImageIndex + 1
            : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, project?.images]);

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
                    Screenshots
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-card cursor-pointer group"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-dark-elevated/90 rounded-full p-2">
                            <ZoomIn className="w-6 h-6 text-gray-900 dark:text-white" />
                          </div>
                        </div>
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

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && project?.images && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
            />

            {/* Image Container */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Navigation Buttons */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedImageIndex(
                          selectedImageIndex > 0
                            ? selectedImageIndex - 1
                            : project.images.length - 1
                        );
                      }}
                      className="absolute left-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
                      aria-label="Previous"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedImageIndex(
                          selectedImageIndex < project.images.length - 1
                            ? selectedImageIndex + 1
                            : 0
                        );
                      }}
                      className="absolute right-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
                      aria-label="Next"
                    >
                      <ArrowLeft className="w-6 h-6 rotate-180" />
                    </button>
                  </>
                )}

                {/* Image */}
                <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                  <Image
                    src={project.images[selectedImageIndex]}
                    alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                    width={1920}
                    height={1080}
                    className="max-w-full max-h-full object-contain select-none"
                    priority
                    unoptimized
                    draggable={false}
                  />
                </div>

                {/* Image Counter */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-dark-elevated/90 backdrop-blur-sm rounded-lg px-6 py-2 shadow-lg z-20">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedImageIndex + 1} / {project.images.length}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer profile={profile} />
    </>
  );
}
