// src/features/projects/components/MobileProjectCard.tsx
import { Link } from "react-router-dom";
import type { Project } from "../../../domain/models/Project";
import { strokeStyle } from "../../../components/ui/stroke";
import { CardTag } from "./CardTag";

/**
 * The phone project card (Figma: Project Card 2.0 / Mobile): a yellow tab on
 * the left, the hero art bleeding across the card and fading in behind the
 * text, and the original angular rim.
 */
export const MobileProjectCard = ({ project, search }: { project: Project; search: string }) => {
  const art = project.cardArt;
  return (
    <Link
      to={{ pathname: `/project/${project.id}`, search }}
      className="stroke stroke-angular relative flex min-h-[140px] flex-col gap-2 overflow-hidden rounded-[14px] bg-night shadow-[0_0_14px_rgb(239_193_57/0.3)] active:scale-[0.99]"
      style={strokeStyle({ stroke: 2, pad: { top: 18, bottom: 18, left: 148, right: 16 } })}
    >
      <img
        src={art.src}
        srcSet={art.srcSet}
        alt=""
        loading="lazy"
        className="absolute top-1/2 left-[-25px] h-[193px] w-[296px] max-w-none -translate-y-1/2 object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_12%,color-mix(in_srgb,var(--night-bg)_88%,transparent)_42%,var(--night-bg)_60%)]" />
      <div className="absolute inset-y-0 left-0 w-2.5 bg-[image:linear-gradient(180deg,var(--color-accent),var(--color-secondary))]" />

      <p className="type-label relative text-t-primary">{project.shortLabel}</p>
      <h2 className="type-card-title relative text-fg">{project.name}</h2>
      <ul className="relative flex flex-wrap gap-1.5">
        {project.tags.slice(0, 2).map((tag) => (
          <li key={tag}>
            <CardTag className="h-8">{tag}</CardTag>
          </li>
        ))}
      </ul>
    </Link>
  );
};
