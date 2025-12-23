'use client';

// ===========================================
// ADMIN DASHBOARD PAGE
// ===========================================

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Layers,
  Briefcase,
  FolderKanban,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui';
import { getProfile, getSkills, getExperience, getProjects, getCertificates } from '@/lib/firestore';

// ===========================================
// TYPES
// ===========================================

interface Stats {
  skillsCount: number;
  experienceCount: number;
  projectsCount: number;
  certificatesCount: number;
}

// ===========================================
// DASHBOARD CARDS
// ===========================================

const dashboardCards = [
  {
    title: 'Profile',
    description: 'Manage your personal information',
    href: '/admin/profile',
    icon: User,
    color: 'bg-blue-500',
  },
  {
    title: 'Skills',
    description: 'Add and organize your skills',
    href: '/admin/skills',
    icon: Layers,
    color: 'bg-green-500',
    statKey: 'skillsCount' as const,
  },
  {
    title: 'Experience',
    description: 'Update your work history',
    href: '/admin/experience',
    icon: Briefcase,
    color: 'bg-purple-500',
    statKey: 'experienceCount' as const,
  },
  {
    title: 'Projects',
    description: 'Showcase your best work',
    href: '/admin/projects',
    icon: FolderKanban,
    color: 'bg-orange-500',
    statKey: 'projectsCount' as const,
  },
  {
    title: 'Certificates',
    description: 'Display your credentials',
    href: '/admin/certificates',
    icon: Award,
    color: 'bg-pink-500',
    statKey: 'certificatesCount' as const,
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// ===========================================
// COMPONENT
// ===========================================

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    skillsCount: 0,
    experienceCount: 0,
    projectsCount: 0,
    certificatesCount: 0,
  });
  const [profileName, setProfileName] = useState<string>('');

  useEffect(() => {
    async function fetchStats() {
      const [profileRes, skillsRes, expRes, projRes, certRes] = await Promise.all([
        getProfile(),
        getSkills(),
        getExperience(),
        getProjects(),
        getCertificates(),
      ]);

      setProfileName(profileRes.data?.name || '');
      setStats({
        skillsCount: skillsRes.data?.length || 0,
        experienceCount: expRes.data?.length || 0,
        projectsCount: projRes.data?.length || 0,
        certificatesCount: certRes.data?.length || 0,
      });
    }

    fetchStats();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back{profileName ? `, ${profileName}` : ''}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your portfolio content from here
        </p>
      </div>

      {/* Dashboard Cards */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dashboardCards.map((card) => (
          <motion.div key={card.href} variants={itemVariants}>
            <Link href={card.href}>
              <Card hover className="h-full group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color} text-white`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  {card.statKey && (
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats[card.statKey]}
                    </span>
                  )}
                </div>
                <CardTitle className="group-hover:text-primary-500 transition-colors">
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
                <div className="mt-4 flex items-center text-sm text-primary-500 font-medium">
                  Manage
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Tips */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Tips
        </h2>
        <Card variant="bordered" className="bg-primary-50/50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              Keep your profile up to date with your latest contact information
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              Add featured projects to highlight your best work
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              Upload high-quality images for projects (recommended: 1200x800px)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">•</span>
              Changes are saved automatically and reflected on your live site
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

