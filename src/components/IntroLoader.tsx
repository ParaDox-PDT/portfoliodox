'use client';

// ===========================================
// INTRO LOADER COMPONENT
// ===========================================

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// ===========================================
// COMPONENT
// ===========================================

export function IntroLoader() {
  const [showLoader, setShowLoader] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Check if intro has already been played in this session
    const introPlayed = sessionStorage.getItem('introPlayed');
    
    if (!introPlayed) {
      setShowLoader(true);
      // Mark as played immediately to prevent showing on navigation
      sessionStorage.setItem('introPlayed', 'true');
      
      // Prevent scrolling while loader is visible
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const logoVariants = {
    hidden: { 
      x: prefersReducedMotion ? 0 : -150,
      opacity: 0 
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.7,
        ease: [0.16, 1, 0.3, 1], // Custom easeOut for smoother animation
        type: 'tween',
      },
    },
  };

  const textContainerVariants = {
    hidden: { 
      width: '0%',
      opacity: 0,
    },
    visible: { 
      width: '100%',
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.55,
        ease: [0.16, 1, 0.3, 1], // Custom easeOut
        type: 'tween',
      },
    },
  };

  const textVariants = {
    hidden: { 
      x: prefersReducedMotion ? 0 : -20,
      opacity: 0,
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.55,
        ease: [0.16, 1, 0.3, 1], // Custom easeOut
        type: 'tween',
      },
    },
  };

  // Handle logo animation completion - start text reveal
  const handleLogoComplete = () => {
    if (!showText && !isExiting) {
      // Wait 120ms after logo stops, then reveal text
      setTimeout(() => {
        setShowText(true);
      }, prefersReducedMotion ? 50 : 120);
    }
  };

  // Handle text animation completion - start exit
  const handleTextComplete = () => {
    if (!isExiting) {
      // Wait a bit before starting exit animation
      setTimeout(() => {
        setIsExiting(true);
        // Fade out quickly
        setTimeout(() => {
          setShowLoader(false);
          document.body.style.overflow = '';
        }, 200);
      }, prefersReducedMotion ? 100 : 300);
    }
  };

  if (!showLoader) return null;

  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-bg"
          variants={containerVariants}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{ willChange: 'opacity' }}
        >
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Logo - Fixed size to prevent shrinking */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              onAnimationComplete={handleLogoComplete}
              className="relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16"
              style={{ 
                willChange: 'transform, opacity',
                minWidth: '48px',
                flexShrink: 0,
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority
                sizes="(max-width: 640px) 48px, 64px"
                style={{ 
                  width: '100%', 
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </motion.div>

            {/* Text with reveal animation */}
            {showText && (
              <motion.div
                className="overflow-hidden"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
                onAnimationComplete={handleTextComplete}
                style={{ willChange: 'width, opacity' }}
              >
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white whitespace-nowrap"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ willChange: 'transform, opacity' }}
                >
                  PortfolioDox
                </motion.h1>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
