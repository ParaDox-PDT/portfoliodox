'use client';

// ===========================================
// CERTIFICATES SECTION COMPONENT
// ===========================================

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Award, Calendar } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card, Badge, Button } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import type { Certificate } from '@/types';

// ===========================================
// TYPES
// ===========================================

interface CertificatesSectionProps {
  certificates: Certificate[];
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
    },
  },
};

// ===========================================
// COMPONENT
// ===========================================

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (!certificates || certificates.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          label="Certificates"
          title="Professional credentials"
          description="Certifications that validate my expertise and commitment to continuous learning"
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={itemVariants}>
              <Card hover className="h-full flex flex-col">
                {/* Image */}
                {cert.imageUrl && (
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-hover">
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Icon (if no image) */}
                {!cert.imageUrl && (
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {cert.issuer}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>Issued {formatDate(cert.issueDate, { month: 'short', year: 'numeric' })}</span>
                  </div>

                  {/* Description */}
                  {cert.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {cert.description}
                    </p>
                  )}

                  {/* Skills */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="default" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Credential Link */}
                  {cert.credentialUrl && (
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          rightIcon={<ExternalLink className="w-4 h-4" />}
                        >
                          View Credential
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CertificatesSection;

