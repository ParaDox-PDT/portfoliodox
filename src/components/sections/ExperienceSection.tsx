'use client';

// ===========================================
// EXPERIENCE SECTION COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building2, Calendar, MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui';
import { formatDateRange } from '@/lib/utils';
import type { Experience } from '@/types';

// ===========================================
// TYPES
// ===========================================

interface ExperienceSectionProps {
  experience: Experience[];
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
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// ===========================================
// COMPONENT
// ===========================================

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          label="Experience"
          title="Professional journey"
          centered={false}
        />

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-dark-border" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative pl-8 md:pl-24"
                variants={itemVariants}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-elevated" />

                {/* Content Card */}
                <div className="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Company Logo */}
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-dark-hover flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.companyLogo ? (
                          <Image
                            src={item.companyLogo}
                            alt={item.company}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-gray-400" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.role}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Date & Type */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {formatDateRange(item.startDate, item.endDate)}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="mb-4 space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-primary-500 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <Badge key={tech} variant="default" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ExperienceSection;

