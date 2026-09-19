'use client';

// ===========================================
// CERTIFICATES SECTION COMPONENT (21ST.DEV + ECC)
// ===========================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Award, Calendar, X, ZoomIn, ZoomOut, RotateCcw, ArrowUpRight } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { formatDate } from '@/lib/utils';
import type { Certificate } from '@/types';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

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

  // Handle keyboard navigation for modal
  useEffect(() => {
    if (!selectedCertificate) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCertificate(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <>
      <section id="certificates" className="py-24 border-t border-[#27272a] bg-[#111113]">
        <div className="portfolio-container">
          <div className="mb-12">
            <p className="eyebrow">04 / Credentials</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
              Verified <span>knowledge.</span>
            </h2>
            <p className="section-description">
              Certifications that validate my expertise, standards, and commitment to continuous growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
            {certificates.map((cert) => (
              <SpotlightCard
                key={cert.id}
                className="flex flex-col p-5 md:p-6"
                spotlightColor="rgba(6, 182, 212, 0.08)"
                borderSpotlightColor="rgba(6, 182, 212, 0.35)"
              >
                {/* Certificate Image Preview / Button */}
                {cert.imageUrl ? (
                  <button
                    type="button"
                    aria-label={`Enlarge ${cert.title}`}
                    className="group/img relative aspect-[16/10] w-full mb-5 rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-950 cursor-pointer"
                    onClick={() => setSelectedCertificate(cert)}
                  >
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover/img:opacity-100 transition-all duration-300 scale-90 group-hover/img:scale-100 rounded-full bg-zinc-900/90 border border-zinc-700 p-2.5 text-cyan-300 shadow-lg">
                        <ZoomIn size={18} />
                      </span>
                    </div>
                  </button>
                ) : (
                  <div className="flex h-32 items-center justify-center rounded-lg border border-zinc-850 bg-zinc-900/40 mb-5 text-cyan-400">
                    <Award size={36} strokeWidth={1.5} />
                  </div>
                )}

                {/* Issuer & Date */}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="font-semibold text-cyan-400">{cert.issuer}</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Calendar size={12} className="text-zinc-500" />
                    <span>{formatDate(cert.issueDate, { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold tracking-tight text-zinc-100 mb-2">
                  {cert.title}
                </h3>

                {/* Description */}
                {cert.description && (
                  <p className="text-xs leading-relaxed text-zinc-400 mb-4 line-clamp-2">
                    {cert.description}
                  </p>
                )}

                {/* Skills tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-auto pt-2">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 text-[10px] text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Credential link */}
                {cert.credentialUrl && (
                  <div className="mt-auto pt-4 border-t border-zinc-850">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                    >
                      Verify credential <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
              </SpotlightCard>
            ))}
          </div>

          {certificates.length === 0 && (
            <p className="portfolio-empty">Certificates will be displayed here when available.</p>
          )}
        </div>
      </section>

      {/* Lightbox Modal with Zoom */}
      <AnimatePresence>
        {selectedCertificate && selectedCertificate.imageUrl && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedCertificate.title}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="pointer-events-auto absolute top-6 right-6 z-30 rounded-full border border-zinc-700 bg-zinc-900/80 p-2.5 text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label="Close certificate viewer"
              >
                <X size={20} />
              </button>

              {/* Transform Viewer */}
              <div className="pointer-events-auto w-full h-full max-h-[82vh] flex items-center justify-center">
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={4}
                  centerOnInit
                  wheel={{ step: 0.1 }}
                  doubleClick={{ step: 0.5 }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Floating zoom controls */}
                      <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 p-1.5 backdrop-blur-md">
                        <button
                          onClick={() => zoomIn()}
                          className="rounded p-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                          aria-label="Zoom in"
                        >
                          <ZoomIn size={16} />
                        </button>
                        <button
                          onClick={() => zoomOut()}
                          className="rounded p-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                          aria-label="Zoom out"
                        >
                          <ZoomOut size={16} />
                        </button>
                        <button
                          onClick={() => resetTransform()}
                          className="rounded p-1.5 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                          aria-label="Reset zoom"
                        >
                          <RotateCcw size={16} />
                        </button>
                      </div>

                      <TransformComponent
                        wrapperClass="!w-full !h-full flex items-center justify-center"
                        contentClass="!w-full !h-full flex items-center justify-center"
                      >
                        <div className="relative max-w-[85vw] max-h-[75vh] w-full h-full flex items-center justify-center">
                          <Image
                            src={selectedCertificate.imageUrl!}
                            alt={selectedCertificate.title}
                            width={1200}
                            height={800}
                            className="max-w-full max-h-[75vh] object-contain select-none rounded-lg shadow-2xl border border-zinc-800"
                            priority
                            unoptimized
                            draggable={false}
                          />
                        </div>
                      </TransformComponent>
                    </div>
                  )}
                </TransformWrapper>
              </div>

              {/* Caption pill */}
              <div className="pointer-events-auto mt-4 rounded-full border border-zinc-800 bg-zinc-900/90 px-6 py-2 backdrop-blur-md text-center">
                <p className="text-sm font-medium text-white">{selectedCertificate.title}</p>
                <p className="text-xs text-cyan-400">{selectedCertificate.issuer}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CertificatesSection;
