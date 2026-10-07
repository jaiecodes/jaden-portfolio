// src/features/projects/components/SnapshotStrip.tsx
import { forwardRef } from "react";
import type { Project, SnapshotFact } from "../../../domain/models/Project";
import { Chip } from "../../../components/ui/Chip";
import { ProjectLinkButton } from "./ProjectLinkButton";

const Kicker = ({ children }: { children: string }) => <p className="type-label text-faint">{children}</p>;

const Fact = ({ label, fact, highlight }: { label: string; fact: SnapshotFact; highlight?: boolean }) => (
  <div className="flex min-w-0 flex-1 flex-col gap-2.5 pr-6">
    <Kicker>{label}</Kicker>
    <p className={`type-body max-w-[240px] ${highlight ? "text-t-highlight" : "text-fg"}`}>{fact.value}</p>
    <p className="type-body-sm max-w-[240px] text-muted">{fact.detail}</p>
  </div>
);

/** Phone: one line per fact, value and detail joined. */
const CompactFact = ({ label, fact, highlight }: { label: string; fact: SnapshotFact; highlight?: boolean }) => (
  <div className="flex flex-col gap-1.5">
    <Kicker>{label}</Kicker>
    <p className={`type-body-sm ${highlight ? "text-t-highlight" : "text-fg"}`}>
      {fact.value} · {fact.detail}
    </p>
  </div>
);

/**
 * The facts at a glance under the hero (Figma: Snapshot strip): role, team
 * and timeline, stack, outcome and links. On phones it stacks, and the links
 * move to the sticky bar at the bottom of the screen.
 */
export const SnapshotStrip = forwardRef<HTMLElement, { project: Project }>(({ project }, ref) => {
  const s = project.snapshot;
  const stack = (
    <div className="flex flex-wrap gap-1.5">
      {s.stack.map((t) => (
        <Chip key={t}>{t}</Chip>
      ))}
    </div>
  );
  return (
    <section ref={ref} aria-label="Snapshot" className="rounded-[18px] border border-line bg-raised">
      <div className="hidden items-start px-9 py-7 lg:flex">
        <Fact label="My role" fact={s.role} />
        <Fact label="Team & timeline" fact={s.team} />
        <div className="flex min-w-0 flex-1 flex-col gap-2.5 pr-6">
          <Kicker>Stack</Kicker>
          {stack}
        </div>
        <Fact label="Outcome" fact={s.outcome} highlight />
        {project.links.length > 0 && (
          <div className="flex shrink-0 flex-col items-start gap-2.5 pr-6">
            <Kicker>Links</Kicker>
            {project.links.map((l) => (
              <ProjectLinkButton key={l.label} link={l} />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 p-5 lg:hidden">
        <CompactFact label="My role" fact={s.role} />
        <CompactFact label="Team & timeline" fact={s.team} />
        <CompactFact label="Outcome" fact={s.outcome} highlight />
        {stack}
      </div>
    </section>
  );
});
SnapshotStrip.displayName = "SnapshotStrip";
