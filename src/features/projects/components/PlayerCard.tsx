// src/features/projects/components/PlayerCard.tsx
import { Link } from "react-router-dom";
import type { Project } from "../../../domain/models/Project";
import { strokeStyle } from "../../../components/ui/stroke";
import { CardTag } from "./CardTag";

const GLOW = "shadow-[0_0_14px_rgb(239_193_57/0.4)]";
const GLOW_HOVER =
  "group-hover:shadow-[0_0_28px_2px_rgb(239_193_57/0.55),0_16px_60px_rgb(221_139_45/0.3)] group-focus-visible:shadow-[0_0_28px_2px_rgb(239_193_57/0.55),0_16px_60px_rgb(221_139_45/0.3)]";

/**
 * The desktop project card (Figma: Player Card): the original layout — glow
 * rim, top tab, year, centred caps title, description panel, 2×2 tags — with
 * the hero art in place of the icon, fading into the card. Hover lifts it
 * 6px, brightens the glow and zooms the art 6%.
 */
export const PlayerCard = ({ project, search }: { project: Project; search: string }) => {
  const art = project.cardArt;
  return (
    <Link
      to={{ pathname: `/project/${project.id}`, search }}
      className="group block w-full max-w-[360px] rounded-2xl outline-none"
      aria-label={project.name}
    >
      <article
        className={`stroke stroke-angular rounded-2xl bg-night transition duration-300 group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 ${GLOW} ${GLOW_HOVER}`}
        style={strokeStyle({ stroke: 2, pad: 8 })}
      >
        <div
          className="stroke overflow-hidden rounded-lg bg-night"
          style={strokeStyle({ stroke: 1, paint: "var(--paint-accent-secondary)" })}
        >
          {/* Art under the top tab */}
          <div className="relative h-[206px] overflow-hidden rounded-t-lg">
            <div className="absolute inset-x-0 top-[10px] bottom-0 overflow-hidden bg-sunken">
              <img
                src={art.src}
                srcSet={art.srcSet}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.35))]" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-night" />
            </div>
            <div className="absolute inset-x-0 top-0 h-2.5 rounded-t-[5px] bg-[image:var(--paint-accent-secondary)]" />
            <span className="type-chip absolute top-[22px] right-[10px] rounded-[6px] border border-accent bg-[color-mix(in_srgb,var(--color-ember)_30%,var(--night-bg))] px-3 py-1 text-accent">
              {project.year}
            </span>
          </div>

          <div className="flex flex-col items-center gap-3 px-3 pt-2.5 pb-3">
            <h2 className="type-card-title flex h-[62px] items-center text-center text-fg">{project.name}</h2>
            <p className="type-body-sm flex h-[104px] w-full items-center justify-center overflow-hidden rounded-[6px] bg-raised px-[18px] py-3.5 text-center text-muted">
              {project.summary}
            </p>
            <ul className="grid w-full grid-cols-2 gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <li key={tag} className="flex">
                  <CardTag className="h-[38px] w-full">{tag}</CardTag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Link>
  );
};
