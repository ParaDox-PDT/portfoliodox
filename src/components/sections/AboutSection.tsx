'use client';

// ===========================================
// ABOUT SECTION COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Rocket, Users } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Profile } from '@/types';

// ===========================================
// TYPES
// ===========================================

interface AboutSectionProps {
  profile?: Profile | null;
}

// ===========================================
// HIGHLIGHTS
// ===========================================

const highlights = [
  {
    icon: Rocket,
    title: 'Production Apps',
    description: 'Apps with 10K+ downloads on stores',
  },
  {
    icon: Users,
    title: 'International Experience',
    description: 'Worked with teams across 5+ countries',
  },
  {
    icon: Code2,
    title: 'Full-Stack Mobile',
    description: 'From UI to backend integrations',
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
      duration: 0.5,
    },
  },
};

// ===========================================
// COMPONENT
// ===========================================

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          label="About"
          title="Turning ideas into"
          titleHighlight="polished products"
          centered={false}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              className="text-xl text-gray-700 dark:text-gray-300 font-medium"
              variants={itemVariants}
            >
              I'm a Flutter Developer passionate about creating mobile experiences
              that users love and businesses rely on.
            </motion.p>

            <motion.div
              className="mt-6 space-y-4 text-gray-600 dark:text-gray-400"
              variants={itemVariants}
            >
              <p>
                {profile?.bio || 
                  `Over the past 3+ years, I've had the privilege of working with startups 
                  and established companies to build production-grade mobile applications 
                  used by thousands of users daily.`}
              </p>
              <p>
                My approach combines technical excellence with a deep understanding of 
                user needs. I believe that great apps aren't just about clean code—they're 
                about solving real problems and delivering genuine value.
              </p>
              <p>
                I specialize in <strong className="text-gray-900 dark:text-white">Clean Architecture</strong>, 
                <strong className="text-gray-900 dark:text-white"> BLoC pattern</strong>, and building 
                scalable solutions that grow with your business.
              </p>
            </motion.div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <highlight.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

