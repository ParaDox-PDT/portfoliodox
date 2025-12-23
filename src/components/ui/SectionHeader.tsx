'use client';

// ===========================================
// SECTION HEADER COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===========================================
// TYPES
// ===========================================

export interface SectionHeaderProps {
  number?: string;
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  className?: string;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ===========================================
// COMPONENT
// ===========================================

export function SectionHeader({
  number,
  label,
  title,
  titleHighlight,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Label */}
      {(number || label) && (
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          variants={itemVariants}
        >
          {number && (
            <span className="text-primary-500 font-mono text-sm font-medium">
              {number}
            </span>
          )}
          {number && label && (
            <span className="text-gray-400">/</span>
          )}
          {label && (
            <span className="text-primary-500 font-mono text-sm font-medium uppercase tracking-wider">
              {label}
            </span>
          )}
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
        variants={itemVariants}
      >
        {title}
        {titleHighlight && (
          <>
            <br />
            <span className="text-primary-500">{titleHighlight}</span>
          </>
        )}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          className={cn(
            'mt-4 text-lg text-gray-600 dark:text-gray-400',
            centered && 'max-w-2xl mx-auto'
          )}
          variants={itemVariants}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeader;

