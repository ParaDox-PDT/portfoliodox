import { ArrowUpRight, Layers, Smartphone, Code2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Profile } from "@/types";
export function AboutSection({ profile }: { profile?: Profile | null }) {
  return (
    <section id="about" className="about-section">
      <div className="portfolio-container about-layout">
        <div>
          <p className="eyebrow">05 / Behind the code</p>
          <h2>
            A developer.
            <br />A problem solver.
            <br />
            <span>A detail person.</span>
          </h2>
          <a className="portfolio-text-link" href="#contact">
            Get to know me <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I care about how an app feels just as much as how it works.
          </p>
          <p className="about-bio">
            {profile?.bio ||
              "I’m a Flutter developer who brings ideas to life through thoughtful interfaces and maintainable code. I work across mobile UI, application architecture, and backend integrations."}
          </p>
          <div className="about-principles grid gap-3.5 mt-8">
            {[
              {
                Icon: Smartphone,
                title: "Made for people",
                text: "Intuitive interfaces, fluid animations, and considered interactions.",
              },
              {
                Icon: Layers,
                title: "Built to grow",
                text: "Clean architecture and modular state management from the first commit.",
              },
              {
                Icon: Code2,
                title: "Care in every detail",
                text: "From pixel precision in the UI to robust error handling underneath.",
              },
            ].map(({ Icon, title, text }) => (
              <SpotlightCard
                key={title}
                className="flex items-start gap-4 p-4 border-zinc-800/80 bg-zinc-900/40"
                spotlightColor="rgba(6, 182, 212, 0.05)"
                borderSpotlightColor="rgba(6, 182, 212, 0.3)"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-cyan-400">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
                  <p className="mt-0.5 text-xs text-zinc-400 leading-relaxed">{text}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutSection;
