"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Send,
  Globe,
  Briefcase,
  Download,
  Copy,
  Check,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { personData } from "@/lib/seo.config";
import type { Profile } from "@/types";

export function ContactSection({ profile }: { profile?: Profile | null }) {
  const [copied, setCopied] = useState(false);
  const email = profile?.email || personData.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard!", {
        style: {
          background: "#161618",
          color: "#f9fafb",
          border: "1px solid #22d3ee",
          borderRadius: "10px",
        },
        iconTheme: {
          primary: "#06b6d4",
          secondary: "#0a0a0b",
        },
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy email");
    }
  };

  const links = [
    {
      label: "GitHub",
      href: profile?.github || personData.socialProfiles.github,
      Icon: Github,
    },
    {
      label: "Telegram",
      href: profile?.telegram || personData.socialProfiles.telegram,
      Icon: Send,
    },
    {
      label: "LinkedIn",
      href: profile?.linkedin || personData.socialProfiles.linkedin,
      Icon: Linkedin,
    },
    { label: "hh.uz", href: profile?.hhuz, Icon: Briefcase },
    { label: "Website", href: profile?.website, Icon: Globe },
    { label: "Résumé", href: profile?.resumeUrl, Icon: Download },
  ];

  return (
    <section id="contact" className="contact-section portfolio-container">
      <SpotlightCard
        className="contact-panel relative overflow-hidden !border-zinc-800/80 !bg-[#111113]/90 backdrop-blur-xl p-8 sm:p-14 lg:p-20 text-center"
        spotlightColor="rgba(6, 182, 212, 0.09)"
        borderSpotlightColor="rgba(168, 85, 247, 0.35)"
        radius={500}
      >
        {/* Subtle ambient spotlight glow behind the panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-cyan-500/20 via-purple-500/15 to-transparent blur-3xl opacity-60"
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>06 / LET’S COLLABORATE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white">
            Your next idea.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
              Let’s build it.
            </span>
          </h2>

          <p className="max-w-xl mx-auto text-zinc-400 mt-6 text-sm sm:text-base leading-relaxed">
            Have a project in mind or a team that needs an experienced Flutter developer?
            <br className="hidden sm:block" /> I’d love to hear what you’re working on.
          </p>

          {/* Action Row: Primary Say Hello + Interactive Copy Email Pill */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <a
                href={`mailto:${email}`}
                className="portfolio-button group shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all"
              >
                <span>Say hello</span>
                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </MagneticButton>

            {/* Centered, ultra-interactive copy pill with no detached icons */}
            <div
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleCopyEmail()}
              className="group/copy relative flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm backdrop-blur-md transition-all duration-200 hover:border-cyan-500/50 hover:bg-zinc-850 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] active:scale-95 select-none"
              aria-label="Copy email address to clipboard"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 group-hover/copy:border-cyan-400 transition-colors">
                <Mail size={14} />
              </div>
              <span className="font-mono text-xs text-zinc-300 group-hover/copy:text-white transition-colors">
                {email}
              </span>
              <div className="ml-1 flex items-center gap-1.5 rounded-md bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-400 group-hover/copy:bg-cyan-500/20 group-hover/copy:text-cyan-300 transition-colors">
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Availability / Location Live Status Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-zinc-400">Usually replies in &lt; 24h</span>
            </span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span className="inline-flex items-center gap-1.5 text-zinc-400">
              <MapPin size={13} className="text-cyan-400" />
              Tashkent, Uzbekistan (UTC+5)
            </span>
          </div>

          {/* Interactive Social Channels Dock */}
          <div className="mt-12 pt-8 border-t border-zinc-800/80">
            <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-5">
              Connect across the web
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5">
              {links
                .filter((link) => link.href)
                .map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social inline-flex items-center gap-2 rounded-xl border border-zinc-850 bg-zinc-900/60 px-3.5 py-2 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-zinc-800/90 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(6,182,212,0.15)]"
                  >
                    <Icon
                      size={15}
                      className="text-zinc-400 transition-colors group-hover/social:text-cyan-400"
                    />
                    <span>{label}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-zinc-500 transition-all duration-300 group-hover/social:text-cyan-300 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5"
                    />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}

export default ContactSection;
