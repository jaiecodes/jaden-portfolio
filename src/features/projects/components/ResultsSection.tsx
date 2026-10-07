// src/features/projects/components/ResultsSection.tsx
import type { Project } from "../../../domain/models/Project";
import { Text } from "../../../components/ui/Text";
import { SectionHeader } from "./SectionHeader";

/** "How it went": three stats, then what worked and what I'd change. */
export const ResultsSection = ({ project }: { project: Project }) => (
  <section className="flex flex-col gap-10 lg:gap-[60px]">
    <SectionHeader kicker="Results" title="How it went" />
    <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
      {project.stats.map((s) => (
        <li key={s.label} className="flex flex-col gap-2 rounded-2xl border border-line bg-raised px-8 py-[30px]">
          <Text variant="h1" as="p" tone="primary">
            {s.value}
          </Text>
          <Text variant="body" tone="muted">
            {s.label}
          </Text>
        </li>
      ))}
    </ul>
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
      <div className="flex flex-1 flex-col gap-3">
        <Text variant="label" tone="highlight" as="h3">
          What worked
        </Text>
        <Text variant="lead" tone="muted">
          {project.reflection.worked}
        </Text>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Text variant="label" tone="accent" as="h3">
          What I’d do differently
        </Text>
        <Text variant="lead" tone="muted">
          {project.reflection.differently}
        </Text>
      </div>
    </div>
  </section>
);
