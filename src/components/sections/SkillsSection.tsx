"use client";
import { Smartphone, Layers, Server, Wrench } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { groupBy } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/types";
const categories: Record<
  SkillCategory,
  { label: string; Icon: typeof Smartphone; color: string }
> = {
  mobile: { label: "Mobile development", Icon: Smartphone, color: "rgba(6, 182, 212, 0.4)" },
  architecture: { label: "Architecture", Icon: Layers, color: "rgba(168, 85, 247, 0.4)" },
  backend: { label: "Backend & services", Icon: Server, color: "rgba(6, 182, 212, 0.4)" },
  tools: { label: "Tools & workflow", Icon: Wrench, color: "rgba(168, 85, 247, 0.4)" },
  other: { label: "Other skills", Icon: Wrench, color: "rgba(6, 182, 212, 0.4)" },
};
export function SkillsSection({ skills }: { skills: Skill[] }) {
  const groups = groupBy(skills, (skill) => skill.category);
  return (
    <section id="skills" className="skills-section portfolio-container">
      <p className="eyebrow">04 / The toolkit</p>
      <h2>
        The right tools.
        <br />
        <span>Thoughtfully applied.</span>
      </h2>
      <p className="section-description">
        A focused stack for reliable, scalable mobile products.
      </p>
      <div className="skills-grid">
        {Object.entries(groups).map(([category, items]) => {
          const { label, Icon, color } =
            categories[category as SkillCategory] || categories.other;
          return (
            <SpotlightCard
              key={category}
              className="p-6 md:p-7 flex flex-col justify-between"
              borderSpotlightColor={color}
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-cyan-400">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-zinc-100">
                    {label}
                  </h3>
                </div>
                <div className="skill-tags mt-6">
                  {items.map((skill) => (
                    <span
                      key={skill.id || skill.name}
                      title={`${skill.name} • ${skill.level}`}
                      className="group/tag relative inline-flex items-center gap-1.5 rounded-md border border-zinc-850 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300 transition-all duration-200 hover:border-cyan-500/40 hover:bg-cyan-950/20 hover:text-cyan-200 cursor-default"
                    >
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
      {!skills.length && (
        <p className="portfolio-empty">
          Skills will be listed here as they become available.
        </p>
      )}
    </section>
  );
}
export default SkillsSection;
