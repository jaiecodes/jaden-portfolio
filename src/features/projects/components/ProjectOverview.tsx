// src/features/projects/components/ProjectOverview.tsx
import { linkLabel, type Project } from "../../../domain/models/Project";
import type { OverviewSurface } from "../../../domain/models/HeroTheme";
import { StrokeFrame } from "../../../components/ui/StrokeFrame";
import { Text } from "../../../components/ui/Text";
import { Pill } from "../../../components/ui/Pill";
import { MetaField } from "../../../components/ui/MetaField";
import { TextLink } from "../../../components/ui/TextLink";

interface ProjectOverviewProps {
  project: Project;
  /** Colour the hero ends on; the section starts in it and fades to ink. */
  foreground?: string;
  surface: OverviewSurface;
}

/* Light panel: see-through at the top where the backdrop is still pale,
   firmer lower down where the overview fade has darkened behind it. */
const LIGHT_PANEL =
  "linear-gradient(to bottom, rgb(255 255 255 / 0.15) 0%, rgb(255 255 255 / 0.85) 55%, rgb(255 255 255 / 0.92) 100%)";

/**
 * Description beside a panel of facts, tools and links. Continues the hero's
 * colour so the two read as one surface; on pale heroes everything switches
 * to ink text and on-light accents.
 */
export const ProjectOverview = ({ project, foreground, surface }: ProjectOverviewProps) => {
  const light = surface === "light";
  const facts = [
    ["Category", project.category],
    ["Role", project.role],
    ["Year", String(project.year)],
  ].filter(([, value]) => value);

  return (
    <section
      className="px-[17px] py-14 lg:px-[90px] lg:pt-[120px] lg:pb-[90px]"
      style={{
        background: `linear-gradient(to bottom, ${foreground ?? "var(--color-ink)"} 0%, ${
          foreground ?? "var(--color-ink)"
        } 30%, var(--color-ink) 100%)`,
      }}
    >
      <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-8 lg:gap-[54px]">
        <Text variant="overline" as="h2" className={light ? "text-ink" : "text-theme"}>
          Project Overview
        </Text>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[120px]">
          <Text variant="lead" className={`lg:flex-1 ${light ? "text-ink/85" : "text-white/75"}`}>
            {project.description}
          </Text>

          <StrokeFrame
            stroke={2}
            className={`stroke-theme w-full shrink-0 rounded-[10px] lg:w-[560px] ${light ? "" : "bg-theme/5"}`}
            style={light ? { background: LIGHT_PANEL } : undefined}
          >
            <div className="flex flex-col gap-6 p-6 lg:gap-8 lg:p-9">
              <dl className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-7">
                {facts.map(([label, value]) => (
                  <MetaField key={label} label={label} value={value} surface={surface} />
                ))}
              </dl>

              <div className="flex flex-col gap-3 lg:gap-4">
                <Text variant="overline" as="h3" className={light ? "text-ink/60" : "text-body/60"}>
                  Tools &amp; Tech
                </Text>
                <ul className="flex flex-wrap gap-2.5 lg:gap-x-4 lg:gap-y-3">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Pill accent={light ? "var(--theme-dominant-on-light)" : undefined}>{tag}</Pill>
                    </li>
                  ))}
                </ul>
              </div>

              {project.externalLinks.length > 0 && (
                <div className="flex flex-wrap gap-8 lg:gap-10">
                  {project.externalLinks.map((link) => (
                    <TextLink key={link.url} href={link.url} surface={surface}>
                      {linkLabel(link)}
                    </TextLink>
                  ))}
                </div>
              )}
            </div>
          </StrokeFrame>
        </div>
      </div>
    </section>
  );
};
