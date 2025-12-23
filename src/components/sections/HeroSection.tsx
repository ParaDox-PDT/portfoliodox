'use client';

// ===========================================
// HERO SECTION COMPONENT
// ===========================================

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import type { Profile } from '@/types';

// ===========================================
// TYPES
// ===========================================

interface HeroSectionProps {
  profile?: Profile | null;
}

// ===========================================
// ANIMATION VARIANTS
// ===========================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ===========================================
// COMPONENT
// ===========================================

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient dark:opacity-100 opacity-50" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              {profile?.availableForWork && (
                <Badge variant="success" className="mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Available for new projects
                </Badge>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              variants={itemVariants}
            >
              {profile?.title || 'Flutter Developer'}
              <span className="block text-primary-500 mt-2">
                {profile?.subtitle || 'building production-ready apps'}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl"
              variants={itemVariants}
            >
              {profile?.summary || 
                '3+ years crafting high-performance mobile applications for startups and enterprises worldwide. Specializing in clean architecture, beautiful UIs, and seamless user experiences.'}
            </motion.p>

            {/* Location */}
            {profile?.location && (
              <motion.div
                className="mt-4 flex items-center gap-2 text-gray-500 dark:text-gray-400"
                variants={itemVariants}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{profile.location}</span>
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link href="#projects">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  View Projects
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg">
                  Contact Me
                </Button>
              </Link>
              {profile?.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="lg" leftIcon={<Download className="w-4 h-4" />}>
                    Resume
                  </Button>
                </a>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 flex gap-8"
              variants={itemVariants}
            >
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile?.projectsCompleted || 15}+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile?.yearsExperience || 3}+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profile?.happyClients || 10}+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Happy Clients
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative lg:justify-self-end"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto">
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-300 dark:border-primary-700 animate-spin" style={{ animationDuration: '20s' }} />
              
              {/* Avatar Container */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-dark-card overflow-hidden">
                  {profile?.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      👨‍💻
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-dark-card rounded-xl shadow-lg p-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-card rounded-xl shadow-lg p-3"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <span className="text-2xl">💙</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

