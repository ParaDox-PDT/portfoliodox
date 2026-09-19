"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "success" | "accent" | "purple";
  pulse?: boolean;
}

/**
 * Modern Status Badge with radar ping effect inspired by 21st.dev badge components.
 */
export function StatusBadge({
  children = "Available for work",
  className = "",
  variant = "accent",
  pulse = true,
}: StatusBadgeProps) {
  const colorMap = {
    accent: {
      border: "border-cyan-500/30",
      bg: "bg-cyan-950/30 text-cyan-200",
      dot: "bg-cyan-400",
      ping: "bg-cyan-400",
      glow: "shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    },
    success: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/30 text-emerald-200",
      dot: "bg-emerald-400",
      ping: "bg-emerald-400",
      glow: "shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    },
    purple: {
      border: "border-purple-500/30",
      bg: "bg-purple-950/30 text-purple-200",
      dot: "bg-purple-400",
      ping: "bg-purple-400",
      glow: "shadow-[0_0_12px_rgba(168,85,247,0.25)]",
    },
  };

  const style = colorMap[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-md transition-all duration-300 hover:border-opacity-60",
        style.border,
        style.bg,
        style.glow,
        className
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              style.ping
            )}
          />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", style.dot)} />
      </span>
      <span>{children}</span>
    </span>
  );
}

export default StatusBadge;
