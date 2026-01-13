'use client';

// ===========================================
// CERTIFICATES SECTION COMPONENT
// ===========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Award, Calendar, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
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
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCertificate]);

  if (!certificates || certificates.length === 0) {
    return null;
  }

  const handleImageClick = (cert: Certificate) => {
    if (cert.imageUrl) {
      setSelectedCertificate(cert);
    }
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedCertificate) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (selectedCertificate) {
      window.addEventListener('keydown', handleKeyDown as any);
      return () => {
        window.removeEventListener('keydown', handleKeyDown as any);
      };
    }
  }, [selectedCertificate]);

  return (
    <>
      <section id="certificates" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            number="04"
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
                    <div 
                      className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-hover cursor-pointer group"
                      onClick={() => handleImageClick(cert)}
                    >
                      <Image
                        src={cert.imageUrl}
                        alt={cert.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-dark-elevated/90 rounded-full p-2">
                          <svg
                            className="w-6 h-6 text-gray-900 dark:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
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

    {/* Image Viewer with Zoom */}
    <AnimatePresence>
      {selectedCertificate && selectedCertificate.imageUrl && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
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
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Transform Wrapper */}
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={5}
                centerOnInit={true}
                limitToBounds={false}
                centerZoomedOut={true}
                wheel={{ step: 0.1, wheelDisabled: false }}
                doubleClick={{ disabled: false, step: 0.7 }}
                pan={{
                  disabled: false,
                  velocity: false,
                  lockAxisX: false,
                  lockAxisY: false,
                }}
                zoomIn={{ step: 0.3 }}
                zoomOut={{ step: 0.3 }}
                wrapperClass="w-full h-full"
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    {/* Zoom Controls */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            zoomIn();
                          }}
                          className="bg-white/10 hover:bg-white/20 rounded-lg p-2 text-white transition-colors"
                          aria-label="Zoom In"
                        >
                          <ZoomIn className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            zoomOut();
                          }}
                          className="bg-white/10 hover:bg-white/20 rounded-lg p-2 text-white transition-colors"
                          aria-label="Zoom Out"
                        >
                          <ZoomOut className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            resetTransform();
                          }}
                          className="bg-white/10 hover:bg-white/20 rounded-lg p-2 text-white transition-colors"
                          aria-label="Reset"
                        >
                          <RotateCcw className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Image with Transform */}
                    <TransformComponent
                      wrapperClass="w-full h-full flex items-center justify-center"
                      contentClass="w-full h-full flex items-center justify-center"
                    >
                      <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                        <Image
                          src={selectedCertificate.imageUrl}
                          alt={selectedCertificate.title}
                          width={1200}
                          height={800}
                          className="max-w-full max-h-full object-contain select-none"
                          priority
                          unoptimized
                          draggable={false}
                        />
                      </div>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>

              {/* Certificate Info */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-dark-elevated/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg z-20 pointer-events-none">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                  {selectedCertificate.title}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 text-center mt-1">
                  {selectedCertificate.issuer}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}

export default CertificatesSection;

