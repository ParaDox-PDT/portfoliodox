"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Download, Github } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { personData } from "@/lib/seo.config";
import type { Profile } from "@/types";
const DEFAULT_SUBTITLE = "Cross-platform apps with clean architecture";
const DEFAULT_SUMMARY =
  "Flutter Developer with 3 years of experience building production-ready mobile applications.\nI specialize in Clean Architecture, scalable state management, and real-time features.\nI’ve worked on apps in logistics, healthcare, public services, and gaming — focusing on performance, clean code, and great user experience.";
const DEFAULT_AVATAR =
  "https://firebasestorage.googleapis.com/v0/b/my-portfolio-cbaae.firebasestorage.app/o/profile%2Favatar-1776748881162.jpg?alt=media&token=e8fadec4-a742-4fab-94f2-4c7c8148f63b";

export function HeroSection({ profile }: { profile?: Profile | null }) {
  const reduce = useReducedMotion();
  const name = profile?.name || personData.name;
  return (
    <section className="portfolio-hero" aria-labelledby="hero-title">
      <GridPattern
        width={64}
        height={64}
        className="hero-grid"
        squares={[
          [2, 3],
          [12, 2],
          [15, 6],
        ]}
      />
      <div className="portfolio-container hero-content">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-eyebrow">
            <span className="eyebrow">
              {profile?.title || personData.jobTitle}
            </span>
            {(profile?.availableForWork ?? true) && (
              <StatusBadge variant="accent">Available for work</StatusBadge>
            )}
          </div>
          <p className="hero-intro">Hi, I’m {name.split(" ")[0]}.</p>
          <h1 id="hero-title">
            {profile?.title || personData.jobTitle}
            <br />
            <span>{profile?.subtitle || DEFAULT_SUBTITLE}</span>
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-description">
            {profile?.summary || DEFAULT_SUMMARY}
          </p>
          <div className="hero-actions">
            <MagneticButton>
              <Link className="portfolio-button" href="#projects">
                Explore my work <ArrowUpRight size={19} />
              </Link>
            </MagneticButton>
            <Link className="portfolio-text-link" href="#contact">
              Let’s talk <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <SpotlightCard
            className="hero-aside !p-3 !bg-[#161618] overflow-hidden group/aside shadow-2xl"
            spotlightColor="rgba(6, 182, 212, 0.12)"
            borderSpotlightColor="rgba(6, 182, 212, 0.45)"
          >
            <div className="identity-art">
              <Image
                src={profile?.avatarUrl || DEFAULT_AVATAR}
                alt={name}
                fill
                priority
                sizes="(max-width: 767px) 85vw, 38vw"
                className="identity-photo"
              />
            </div>
            <div className="identity-caption">
              <div>
                <strong>{name}</strong>
                <span>Flutter & mobile development</span>
              </div>
              <a
                href={profile?.github || personData.socialProfiles.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub profile"
                className="transition-transform duration-300 hover:scale-110 hover:border-cyan-400"
              >
                <Github size={21} />
              </a>
            </div>
            {profile?.resumeUrl && (
              <a
                className="resume-link transition-colors hover:text-cyan-300"
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download résumé <Download size={15} />
              </a>
            )}
          </SpotlightCard>
        </motion.div>
      </div>
      <div className="portfolio-container hero-bottom">
        <a href="#skills" className="hero-stack">
          <span>MY TOOLKIT</span>Flutter <span>/</span> Dart <span>/</span>{" "}
          Firebase <ArrowDownRight size={18} />
        </a>
        {profile && (
          <div className="hero-metrics">
            <span>
              <strong>{profile.yearsExperience}+</strong> years building
            </span>
            <span>
              <strong>{profile.projectsCompleted}+</strong> projects delivered
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
export default HeroSection;
