"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { formatDateRange } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Experience } from "@/types";

interface NodeCoord {
  x: number;
  y: number;
}

// Parse YYYY-MM or ISO date string safely
function parseYearMonth(dateStr?: string): { year: number; month: number } | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const match = dateStr.trim().match(/^(\d{4})[-/.](\d{1,2})/);
  if (match) {
    return {
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
    };
  }
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  }
  return null;
}

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

interface TotalExperienceResult {
  years: number;
  months: number;
  text: string;
  startDateFormatted: string;
  endDateFormatted: string;
}

// Calculate total cumulative career experience directly from Firebase experience list
function calculateTotalExperience(experience: Experience[]): TotalExperienceResult {
  if (!experience || experience.length === 0) {
    return { years: 0, months: 0, text: "", startDateFormatted: "", endDateFormatted: "" };
  }

  let earliestMonthIdx = Infinity;
  let earliestYear = 0;
  let earliestMonth = 0;

  let latestMonthIdx = -Infinity;
  let latestYear = 0;
  let latestMonth = 0;
  let hasCurrentRole = false;

  for (const item of experience) {
    const start = parseYearMonth(item.startDate);
    if (start) {
      const idx = start.year * 12 + (start.month - 1);
      if (idx < earliestMonthIdx) {
        earliestMonthIdx = idx;
        earliestYear = start.year;
        earliestMonth = start.month;
      }
    }

    if (item.isCurrent || !item.endDate) {
      hasCurrentRole = true;
    } else {
      const end = parseYearMonth(item.endDate);
      if (end) {
        const idx = end.year * 12 + (end.month - 1);
        if (idx > latestMonthIdx) {
          latestMonthIdx = idx;
          latestYear = end.year;
          latestMonth = end.month;
        }
      }
    }
  }

  if (earliestMonthIdx === Infinity) {
    return { years: 0, months: 0, text: "", startDateFormatted: "", endDateFormatted: "" };
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentMonthIdx = currentYear * 12 + (currentMonth - 1);

  const finalEndIdx = hasCurrentRole ? currentMonthIdx : latestMonthIdx;
  const finalEndYear = hasCurrentRole ? currentYear : latestYear;
  const finalEndMonth = hasCurrentRole ? currentMonth : latestMonth;

  // Calculate real month difference
  const totalMonths = Math.max(0, finalEndIdx - earliestMonthIdx);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let text = "";
  if (years > 0 && months > 0) {
    text = `${years} ${years === 1 ? "year" : "years"} ${months} ${months === 1 ? "month" : "months"}`;
  } else if (years > 0) {
    text = `${years} ${years === 1 ? "year" : "years"}`;
  } else if (months > 0) {
    text = `${months} ${months === 1 ? "month" : "months"}`;
  } else {
    text = "< 1 month";
  }

  const startDateFormatted = `${MONTH_NAMES_SHORT[earliestMonth - 1]} ${earliestYear}`;
  const endDateFormatted = hasCurrentRole ? "Present" : `${MONTH_NAMES_SHORT[finalEndMonth - 1]} ${finalEndYear}`;

  return {
    years,
    months,
    text,
    startDateFormatted,
    endDateFormatted,
  };
}

// Calculate individual role duration directly from role's start and end date
function calculateRoleDuration(startDate: string, endDate?: string, isCurrent?: boolean): string {
  const start = parseYearMonth(startDate);
  if (!start) return "";

  let endYear: number;
  let endMonth: number;

  if (isCurrent || !endDate) {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  } else {
    const end = parseYearMonth(endDate);
    if (!end) return "";
    endYear = end.year;
    endMonth = end.month;
  }

  const startIdx = start.year * 12 + (start.month - 1);
  const endIdx = endYear * 12 + (endMonth - 1);
  const totalMonths = Math.max(1, endIdx - startIdx + 1); // inclusive of start month

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

export function ExperienceSection({
  experience,
}: {
  experience: Experience[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [nodeCoords, setNodeCoords] = useState<NodeCoord[]>([]);
  const [svgBounds, setSvgBounds] = useState({
    left: -70,
    width: 150,
    height: 600,
    svgNodeX: 75,
  });
  const [curveD, setCurveD] = useState<string>("");
  const [totalCurveLength, setTotalCurveLength] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [tipPos, setTipPos] = useState<{ x: number; y: number } | null>(null);

  // Measure all timeline nodes and generate both straight and curved trajectories
  const updateMetrics = useCallback(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll<HTMLElement>("[data-timeline-node]");
    if (nodes.length < 1) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const coords: NodeCoord[] = [];

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      coords.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });

    setNodeCoords(coords);

    if (coords.length >= 2) {
      const nodeX = coords[0].x;
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 1024;

      // Arc curvature depth to the left
      const offset = isMobile ? 22 : isTablet ? 34 : 48;
      const svgNodeX = offset + 24;
      const svgLeft = nodeX - svgNodeX;
      const totalHeight = coords[coords.length - 1].y + 35;
      const svgWidth = svgNodeX + 30;

      setSvgBounds({
        left: svgLeft,
        width: svgWidth,
        height: totalHeight,
        svgNodeX,
      });

      // Construct smooth cubic bezier arc segments between each pair of nodes
      let d = "";
      for (let i = 0; i < coords.length - 1; i++) {
        const yStart = coords[i].y;
        const yEnd = coords[i + 1].y;
        const dy = yEnd - yStart;

        const cp1x = svgNodeX - offset;
        const cp1y = yStart + dy * 0.28;
        const cp2x = svgNodeX - offset;
        const cp2y = yEnd - dy * 0.28;

        if (i === 0) {
          d += `M ${svgNodeX} ${yStart} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${svgNodeX} ${yEnd} `;
        } else {
          d += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${svgNodeX} ${yEnd} `;
        }
      }

      setCurveD(d);
    }
  }, []);

  // Compute curve length once path is generated
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) setTotalCurveLength(len);
      } catch {
        // ignore
      }
    }
  }, [curveD]);

  // Synchronous, lag-free scroll tracking tied directly to node positions in viewport
  const updateScroll = useCallback(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll<HTMLElement>("[data-timeline-node]");
    if (nodes.length < 2) return;

    const firstRect = nodes[0].getBoundingClientRect();
    const lastRect = nodes[nodes.length - 1].getBoundingClientRect();

    // Focal trigger line in the viewport (55% from the top)
    const triggerY = window.innerHeight * 0.55;
    const totalSpan = lastRect.top - firstRect.top;

    if (totalSpan > 0) {
      const currentDist = triggerY - firstRect.top;
      const raw = currentDist / totalSpan;
      const clamped = Math.min(1, Math.max(0, raw));
      setScrollProgress(clamped);
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    const timer = setTimeout(updateMetrics, 120);

    if (!containerRef.current) return () => clearTimeout(timer);

    const observer = new ResizeObserver(() => {
      updateMetrics();
      updateScroll();
    });
    observer.observe(containerRef.current);

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("resize", updateMetrics);
    updateScroll();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", updateMetrics);
    };
  }, [experience, updateMetrics, updateScroll]);

  // Calculate moving particle position along the curved arc
  useEffect(() => {
    if (pathRef.current && totalCurveLength > 0) {
      try {
        const pt = pathRef.current.getPointAtLength(scrollProgress * totalCurveLength);
        setTipPos({ x: pt.x, y: pt.y });
      } catch {
        // ignore
      }
    }
  }, [scrollProgress, totalCurveLength]);

  const hasNodes = nodeCoords.length >= 2;
  const yFirst = hasNodes ? nodeCoords[0].y : 0;
  const yLast = hasNodes ? nodeCoords[nodeCoords.length - 1].y : 0;
  const currentStraightY = yFirst + scrollProgress * (yLast - yFirst);

  const totalExperience = calculateTotalExperience(experience);

  return (
    <section id="experience" className="experience-section portfolio-container">
      <div className="experience-heading">
        <p className="eyebrow">02 / Experience</p>
        <h2>
          Built through
          <br />
          <span>experience.</span>
        </h2>
        <p className="section-description">
          The teams, challenges, and products that shaped my craft.
        </p>

        {totalExperience.text && (
          <div className="mt-5 inline-flex flex-col items-start gap-1">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <span className="font-semibold text-zinc-100">{totalExperience.text}</span>
              <span className="text-zinc-400">total exp</span>
            </div>
            {totalExperience.startDateFormatted && (
              <span className="text-[11px] font-mono text-zinc-400 pl-2">
                {totalExperience.startDateFormatted} — {totalExperience.endDateFormatted}
              </span>
            )}
          </div>
        )}
      </div>

      <div ref={containerRef} className="experience-list relative">
        {/* SVG Dual-Track Timeline (Both Straight Line and Curved Arc) */}
        {hasNodes && (
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${svgBounds.left}px`,
              top: 0,
              width: `${svgBounds.width}px`,
              height: `${svgBounds.height}px`,
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 10,
            }}
          >
            <defs>
              <linearGradient
                id="timelineBeamGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* 1. STRAIGHT LINE (Vertically connects all nodes) */}
            {/* 1A. Passive guide straight line */}
            <line
              x1={svgBounds.svgNodeX}
              y1={yFirst}
              x2={svgBounds.svgNodeX}
              y2={yLast}
              stroke="#27272a"
              strokeWidth="2"
              strokeOpacity="0.75"
            />

            {/* 1B. Active glowing straight beam */}
            {scrollProgress > 0 && (
              <>
                <line
                  x1={svgBounds.svgNodeX}
                  y1={yFirst}
                  x2={svgBounds.svgNodeX}
                  y2={currentStraightY}
                  stroke="#06b6d4"
                  strokeWidth="5"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                  className="blur-[3px]"
                />
                <line
                  x1={svgBounds.svgNodeX}
                  y1={yFirst}
                  x2={svgBounds.svgNodeX}
                  y2={currentStraightY}
                  stroke="url(#timelineBeamGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}

            {/* 2. CURVED LINE (Bows outward to the left, then returns to each node) */}
            {curveD && (
              <>
                {/* 2A. Passive dashed curved guide */}
                <path
                  d={curveD}
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="1.75"
                  strokeOpacity="0.4"
                  strokeDasharray="3 3"
                />

                {/* 2B. Active glowing curved beam */}
                {scrollProgress > 0 && totalCurveLength > 0 && (
                  <>
                    <path
                      d={curveD}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="5"
                      strokeOpacity="0.35"
                      strokeLinecap="round"
                      strokeDasharray={totalCurveLength}
                      strokeDashoffset={totalCurveLength * (1 - scrollProgress)}
                      className="blur-[4px]"
                    />
                    <path
                      ref={pathRef}
                      d={curveD}
                      fill="none"
                      stroke="url(#timelineBeamGradient)"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeDasharray={totalCurveLength}
                      strokeDashoffset={totalCurveLength * (1 - scrollProgress)}
                    />
                  </>
                )}

                {/* Hidden reference path for exact measurement when progress is 0 */}
                {scrollProgress === 0 && (
                  <path
                    ref={pathRef}
                    d={curveD}
                    fill="none"
                    stroke="transparent"
                  />
                )}

                {/* 3. Glowing leading particle on the curved arc */}
                {tipPos && scrollProgress > 0.01 && scrollProgress < 0.999 && (
                  <g transform={`translate(${tipPos.x}, ${tipPos.y})`}>
                    <circle
                      r="8"
                      fill="#06b6d4"
                      fillOpacity="0.35"
                      className="blur-[2px] animate-pulse"
                    />
                    <circle r="4" fill="#22d3ee" />
                    <circle r="1.75" fill="#ffffff" />
                  </g>
                )}
              </>
            )}
          </svg>
        )}

        <div className="space-y-8">
          {experience.map((item, index) => {
            // Compute whether this node has been reached by the scroll beam
            const totalSpan = yLast - yFirst;
            const nodeFraction = totalSpan > 0 && nodeCoords[index]
              ? (nodeCoords[index].y - yFirst) / totalSpan
              : 0;
            const isReached = item.isCurrent || scrollProgress >= nodeFraction - 0.02;

            return (
              <div
                key={item.id || `${item.company}-${item.startDate}`}
                className="relative pl-7 md:pl-9 group"
              >
                {/* Milestone Node - activates when scroll reaches it */}
                <div
                  data-timeline-node={index}
                  aria-hidden="true"
                  className={`timeline-node absolute left-0 top-6 z-20 h-4 w-4 rounded-full border-2 bg-zinc-950 flex items-center justify-center transition-all duration-300 ${
                    isReached
                      ? "border-cyan-400 bg-cyan-950 ring-4 ring-cyan-500/25 shadow-[0_0_15px_rgba(6,182,212,0.85)]"
                      : "border-zinc-700 group-hover:border-cyan-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isReached
                        ? "bg-cyan-300 shadow-[0_0_8px_#22d3ee] scale-100"
                        : "bg-zinc-600 scale-75 group-hover:bg-cyan-400"
                    }`}
                  />

                  {item.isCurrent && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-50" />
                  )}
                </div>

                <SpotlightCard
                  className="p-6 transition-all duration-300 hover:border-zinc-700 hover:shadow-lg"
                  spotlightColor="rgba(168, 85, 247, 0.08)"
                  borderSpotlightColor="rgba(168, 85, 247, 0.35)"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 font-mono text-zinc-400">
                      <Calendar size={13} className="text-cyan-400" />
                      <span>{formatDateRange(item.startDate, item.endDate)}</span>
                      {calculateRoleDuration(item.startDate, item.endDate, item.isCurrent) && (
                        <span className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[10px] text-zinc-400">
                          {calculateRoleDuration(item.startDate, item.endDate, item.isCurrent)}
                        </span>
                      )}
                    </div>
                    {item.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Current role
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-100">
                    {item.role}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-cyan-400 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-zinc-400" />
                      {item.company}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>

                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-zinc-400 border-l border-zinc-800/80 pl-3">
                      {item.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="work-technologies mt-5 pt-3 border-t border-zinc-800/60">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-[11px] text-zinc-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {!experience.length && (
          <p className="portfolio-empty">
            Experience details will be available here soon.
          </p>
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;
