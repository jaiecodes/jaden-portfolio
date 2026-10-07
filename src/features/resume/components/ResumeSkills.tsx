// src/features/resume/components/ResumeSkills.tsx
import { ResumeService } from "../../../domain/services/ResumeService";
import type { SkillIcon } from "../../../domain/models/Resume";
import { Chip } from "../../../components/ui/Chip";
import { Icon, type IconName } from "../../../components/ui/Icon";
import { STEPS } from "./steps";

const ICON: Record<SkillIcon, IconName> = { cube: "cube", chip: "chip", globe: "globe", code: "code" };

/** Skill groups, each in its step colour with an icon badge, divided by rules. */
export const ResumeSkills = () => {
  const skills = ResumeService.getSkills();
  return (
    <section className="flex flex-col gap-6 lg:gap-8 lg:pl-[70px]">
      <h2 className="type-label" style={{ color: STEPS[skills.step].accent }}>
        {skills.title}
      </h2>
      <ul className="flex flex-col">
        {skills.groups.map((g) => {
          const color = STEPS[g.step].chip;
          return (
            <li key={g.title} className="flex flex-col gap-3 border-b border-line py-[22px] first:pt-0 lg:flex-row lg:items-center lg:gap-0">
              <div className="flex items-center gap-3 lg:w-80 lg:shrink-0">
                <span
                  className="flex size-10 items-center justify-center rounded-[10px] border"
                  style={{
                    color,
                    borderColor: `color-mix(in srgb, ${color} 60%, transparent)`,
                    background: `color-mix(in srgb, ${color} 15%, var(--night-bg))`,
                  }}
                >
                  <Icon name={ICON[g.icon]} size={22} />
                </span>
                <span className="type-label-lg" style={{ color }}>
                  {g.title}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s}>
                    <Chip color={color}>{s}</Chip>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
