// src/features/resume/components/TimelineEntry.tsx
import { Link } from "react-router-dom";
import type { ResumeEntry } from "../../../domain/models/Resume";
import { Chip } from "../../../components/ui/Chip";
import { strokeStyle } from "../../../components/ui/stroke";
import { STEPS } from "./steps";

/**
 * One entry: role and organisation, the date, and a context card in the
 * original angular rim. Entries with a case study link their card to it.
 * The node on the track lights up once the leaf reaches it (`lit`).
 */
export const TimelineEntry = ({
  entry,
  lit,
  itemRef,
}: {
  entry: ResumeEntry;
  lit: boolean;
  itemRef?: (el: HTMLLIElement | null) => void;
}) => {
  const step = STEPS[entry.step];
  const card = (
    <div
      className={`stroke stroke-theme flex flex-col gap-3.5 rounded-[14px] bg-raised transition ${entry.href ? "hover:-translate-y-0.5 hover:brightness-110" : ""}`}
      style={strokeStyle({ stroke: 1.5, pad: { top: 20, bottom: 20, left: 24, right: 24 } })}
    >
      <p className="type-body text-muted">{entry.context}</p>
      <ul className="flex flex-wrap gap-1.5">
        {entry.tags.map((t) => (
          <li key={t}>
            <Chip color={step.chip}>{t}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <li ref={itemRef} className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_140px_minmax(400px,560px)] min-[1700px]:grid-cols-[520px_280px_671px] min-[1700px]:justify-between lg:gap-x-10">
      {/* Node on the track */}
      <span
        aria-hidden
        className="absolute top-[7px] left-[-63px] size-[17px] rounded-full border-[5px] transition-[opacity,box-shadow] duration-500 lg:top-[10px] lg:left-[-61px]"
        style={{
          background: step.accent,
          borderColor: step.ring,
          opacity: lit ? 1 : 0.35,
          boxShadow: lit ? `0 0 14px ${step.accent}` : "none",
        }}
      />
      <div className="flex flex-col gap-2">
        <h3 className="type-h3 text-fg">{entry.title}</h3>
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="type-label" style={{ color: step.accent }}>
            {entry.organization}
          </span>
          <span className="type-body-sm text-faint lg:hidden">{entry.date}</span>
        </p>
      </div>
      <p className="type-body hidden pt-1 text-faint lg:block">{entry.date}</p>
      {entry.href ? (
        entry.isExternal ? (
          <a href={entry.href} target="_blank" rel="noopener noreferrer" aria-label={`${entry.title}, open`}>
            {card}
          </a>
        ) : (
          <Link to={entry.href} aria-label={`${entry.title} case study`}>
            {card}
          </Link>
        )
      ) : (
        card
      )}
    </li>
  );
};
