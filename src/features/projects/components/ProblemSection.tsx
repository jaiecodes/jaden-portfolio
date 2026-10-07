// src/features/projects/components/ProblemSection.tsx
import type { Project } from "../../../domain/models/Project";
import { Chip } from "../../../components/ui/Chip";
import { Text } from "../../../components/ui/Text";

/** The problem in one line, the context beside it, and its constraints. */
export const ProblemSection = ({ problem }: { problem: Project["problem"] }) => (
  <section className="flex flex-col gap-5 lg:flex-row lg:gap-20">
    <div className="flex flex-col gap-3 lg:w-[520px] lg:shrink-0">
      <Text variant="label" tone="primary" as="h2">
        The problem
      </Text>
      <Text variant="h2" as="p" className="text-fg max-lg:text-[24px]">
        {problem.heading}
      </Text>
    </div>
    <div className="flex flex-col gap-5 lg:max-w-[780px]">
      <Text variant="lead" className="text-muted max-lg:text-base max-lg:leading-[1.6]">
        {problem.body}
      </Text>
      <ul className="flex flex-wrap gap-2.5" aria-label="Constraints">
        {problem.constraints.map((c) => (
          <li key={c}>
            <Chip>{c}</Chip>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
