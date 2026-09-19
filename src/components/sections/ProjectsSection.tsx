"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Smartphone, Globe, Code2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Project } from "@/types";
export function ProjectsSection({
  projects,
  allProjects = false,
}: {
  projects: Project[];
  allProjects?: boolean;
}) {
  const [filter, setFilter] = useState("all");
  const reduce = useReducedMotion();
  const featured =
    !allProjects && projects.some((project) => project.isFeatured)
      ? projects.filter((project) => project.isFeatured)
      : projects;
  const filtered = featured.filter(
    (project) => filter === "all" || project.category === filter,
  );
  const shown = allProjects ? filtered : filtered.slice(0, 4);
  const categories = [
    { value: "all", label: "All work" },
    { value: "mobile-app", label: "Mobile" },
    { value: "web-app", label: "Web" },
    { value: "open-source", label: "Open source" },
    { value: "package", label: "Packages" },
    { value: "other", label: "Other" },
  ].filter(
    (category) =>
      category.value === "all" ||
      featured.some((project) => project.category === category.value),
  );
  return (
    <section id="projects" className="work-section portfolio-container">
      <div className="work-heading">
        <div>
          <p className="eyebrow">
            {allProjects ? "The project archive" : "02 / Selected work"}
          </p>
          <h2>
            {allProjects ? (
              <>
                All the <span>work.</span>
              </>
            ) : (
              <>
                Ideas made <span>real.</span>
              </>
            )}
          </h2>
          <p className="section-description">
            A closer look at what I’ve been building.
          </p>
        </div>
        <Link
          className="portfolio-text-link"
          href={allProjects ? "/" : "/projects"}
        >
          {allProjects ? "Back home" : "All projects"}{" "}
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div
        className="work-filters relative"
        role="group"
        aria-label="Filter selected projects"
      >
        {categories.map((category) => {
          const isActive = filter === category.value;
          return (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              aria-pressed={isActive}
              className="relative rounded-lg px-4 py-2 text-xs font-medium transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-lg border border-cyan-500/40 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 flex items-center gap-2 ${isActive ? "text-cyan-300" : "text-zinc-400 hover:text-zinc-200"}`}>
                {category.label}
                {category.value === "all" && (
                  <span className="text-[10px] opacity-70">
                    {featured.length.toString().padStart(2, "0")}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div className="work-grid" aria-live="polite">
        {shown.map((project, index) => {
          const Icon =
            project.category === "mobile-app"
              ? Smartphone
              : project.category === "web-app"
                ? Globe
                : Code2;
          return (
            <motion.article
              className="work-card group"
              key={project.id || project.slug}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
            >
              <SpotlightCard className="flex h-full flex-col p-5 md:p-6">
                <Link
                  href={`/projects/${project.slug}`}
                  className="work-image group/img relative"
                  aria-label={`View ${project.title}`}
                >
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                  ) : (
                    <div className="work-placeholder">
                      <Icon size={58} strokeWidth={1} />
                      <span>{project.title}</span>
                      <small>Project preview unavailable</small>
                    </div>
                  )}
                  <span className="work-open" aria-hidden="true">
                    <ArrowUpRight size={22} />
                  </span>
                </Link>
                <div className="work-meta">
                  <span>{project.category.replaceAll("-", " ")}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="work-title">
                  <h3>
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                    >
                      <Github size={19} />
                    </a>
                  )}
                </div>
                <p>{project.shortDescription}</p>
                <div className="work-technologies mt-auto pt-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live project <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.article>
          );
        })}
      </div>
      {shown.length === 0 && (
        <div className="portfolio-empty">
          <Code2 size={28} />
          <p>New work is on the way.</p>
          <Link href="/#contact">
            Let’s discuss your next project <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
}
export default ProjectsSection;
