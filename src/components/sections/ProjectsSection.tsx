'use client';

// ===========================================
// PROJECTS SECTION COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight, ImageIcon } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card, Badge, Button } from '@/components/ui';
import type { Project } from '@/types';

// ===========================================
// TYPES
// ===========================================

interface ProjectsSectionProps {
  projects: Project[];
}

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
// COMPONENT
// ===========================================

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          label="Projects"
          title="Featured work"
          description="A selection of projects that showcase my expertise and approach"
        />

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredProjects.map((project) => (
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
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-300 dark:text-gray-600" />
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
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category */}
                  <Badge variant="primary" size="sm" className="self-start mb-3">
                    {project.category.replace('-', ' ')}
                  </Badge>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
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

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
                    <Link href={`/projects/${project.slug}`} className="flex-1">
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

        {/* View All Button */}
        {projects.length > 4 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View All Projects
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;

