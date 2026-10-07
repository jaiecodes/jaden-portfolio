// src/features/projects/components/MobileLinkBar.tsx
import type { ProjectLink } from "../../../domain/models/Project";
import { ProjectLinkButton } from "./ProjectLinkButton";

/**
 * Phone: the project's links pinned to the bottom of the screen, above the
 * home-indicator safe area (Figma: Sticky link bar).
 */
export const MobileLinkBar = ({ links }: { links: ProjectLink[] }) =>
  links.length > 0 ? (
    <div className="fixed inset-x-0 bottom-0 z-[150] flex gap-2.5 border-t border-line bg-[color-mix(in_srgb,var(--night-bg)_85%,transparent)] px-5 pt-[15px] pb-[calc(15px+env(safe-area-inset-bottom))] backdrop-blur-[16px] lg:hidden">
      {links.map((l) => (
        <ProjectLinkButton key={l.label} link={l} className="flex-1" />
      ))}
    </div>
  ) : null;
