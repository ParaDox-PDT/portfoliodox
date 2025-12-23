'use client';

// ===========================================
// SKILLS SECTION COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import { Smartphone, Layers, Server, Wrench } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card, Badge } from '@/components/ui';
import { groupBy, capitalize } from '@/lib/utils';
import type { Skill, SkillCategory } from '@/types';

// ===========================================
// TYPES
// ===========================================

interface SkillsSectionProps {
  skills: Skill[];
}

// ===========================================
// CATEGORY ICONS
// ===========================================

const categoryIcons: Record<SkillCategory, typeof Smartphone> = {
  mobile: Smartphone,
  architecture: Layers,
  backend: Server,
  tools: Wrench,
  other: Wrench,
};

const categoryLabels: Record<SkillCategory, string> = {
  mobile: 'Mobile Development',
  architecture: 'Architecture & Patterns',
  backend: 'Backend & Services',
  tools: 'Tools & DevOps',
  other: 'Other Skills',
};

const levelColors: Record<string, string> = {
  expert: 'primary',
  advanced: 'secondary',
  intermediate: 'warning',
  beginner: 'default',
};

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

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groupedSkills = groupBy(skills, (skill) => skill.category);
  const categories = Object.keys(groupedSkills) as SkillCategory[];

  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          label="Skills"
          title="Technologies I work with"
          description="A curated stack for building modern, scalable mobile applications"
        />

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {categories.map((category) => {
            const Icon = categoryIcons[category] || Wrench;
            const categorySkills = groupedSkills[category];

            return (
              <motion.div key={category} variants={itemVariants}>
                <Card hover className="h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-dark-border">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {categoryLabels[category]}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-hover rounded-lg"
                      >
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <Badge
                          variant={levelColors[skill.level] as any || 'default'}
                          size="sm"
                        >
                          {capitalize(skill.level)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;

