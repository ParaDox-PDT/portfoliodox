"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderSpotlightColor?: string;
  radius?: number;
}

/**
 * SpotlightCard component inspired by 21st.dev (Aceternity / Preet Suthar pattern).
 * Renders an interactive radial spotlight that tracks mouse movement across the card surface
 * and illuminates borders seamlessly.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(6, 182, 212, 0.08)", // subtle cyan default
  borderSpotlightColor = "rgba(6, 182, 212, 0.35)",
  radius = 280,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType === "touch" || !cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handlePointerEnter() {
    if (!reduceMotion) setIsHovered(true);
  }

  function handlePointerLeave() {
    setIsHovered(false);
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "group relative rounded-xl border border-[#27272a] bg-[#161618] transition-colors duration-300",
        className
      )}
      {...props}
    >
      {/* Dynamic border spotlight */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${radius}px circle at ${mouseX}px ${mouseY}px,
                ${borderSpotlightColor},
                transparent 70%
              )
            `,
          }}
        />
      )}

      {/* Surface illumination spotlight */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                ${radius * 1.2}px circle at ${mouseX}px ${mouseY}px,
                ${spotlightColor},
                transparent 80%
              )
            `,
          }}
        />
      )}

      {/* Card inner content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export default SpotlightCard;
