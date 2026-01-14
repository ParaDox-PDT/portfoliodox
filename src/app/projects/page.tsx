'use client';

// ===========================================
// ALL PROJECTS PAGE
// ===========================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, ImageIcon, Loader2, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card, Badge, Button } from '@/components/ui';
import { getProjects, getProfile } from '@/lib/firestore';
import type { Profile, Project } from '@/types';

// ===========================================
// ANIMATION VARIANTS
// ===========================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// ===========================================
// PAGE COMPONENT
// ===========================================

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, profileRes] = await Promise.all([
          getProjects(),
          getProfile(),
        ]);

        if (projectsRes.data) {
          // Sort projects: featured first, then by order
          const sortedProjects = [...projectsRes.data].sort((a, b) => {
            // Featured projects first
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            // Then by order
            return (a.order || 0) - (b.order || 0);
          });
          setProjects(sortedProjects);
        } else {
          setProjects([]);
        }

        if (profileRes.data) {
          setProfile(profileRes.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg pt-24">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        </div>
        <Footer profile={profile} />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <SectionHeader
            number="03"
            label="Projects"
            title="All Projects"
            description="A comprehensive collection of my work, from featured projects to personal experiments"
          />

          {/* Projects Grid */}
          {projects.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.id}
                  variants={itemVariants}
                >
                  <Card
                    hover
                    padding="none"
                    className="overflow-hidden group h-full flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-video bg-gray-100 dark:bg-dark-hover overflow-hidden">
                      {project.thumbnailUrl ? (
                        <Image
                          src={project.thumbnailUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                        </div>
                      )}

                      {/* Featured Badge */}
                      {project.isFeatured && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="primary" size="sm" className="gap-1">
                            ⭐ Featured
                          </Badge>
                        </div>
                      )}

                      {/* Overlay with Links */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary-500 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white rounded-full text-gray-900 hover:bg-primary-500 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category */}
                      <Badge variant="default" size="sm" className="self-start mb-3">
                        {project.category.replace('-', ' ')}
                      </Badge>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">
                        {project.shortDescription}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="default" size="sm">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="default" size="sm">
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex-1"
                        >
                          <Button
                            variant="ghost"
                            className="w-full"
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                          >
                            View Details
                          </Button>
                        </Link>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ghost" size="icon">
                              <Github className="w-5 h-5" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                No projects found
              </p>
              <Link href="/#projects">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer profile={profile} />
    </>
  );
}
