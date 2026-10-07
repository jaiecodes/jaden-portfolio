// src/features/projects/components/LinkRail.tsx
import { AnimatePresence, motion } from "motion/react";
import { linkHref, type LinkKind, type ProjectLink } from "../../../domain/models/Project";
import { ActionLink } from "../../../components/ui/ActionLink";
import { Icon, type IconName } from "../../../components/ui/Icon";

const ICON: Record<LinkKind, IconName> = {
  video: "video",
  site: "globe",
  source: "github",
  download: "file",
};

/**
 * Sticky link rail in the right margin (Figma: Link Rail). A glass panel
 * tinted with the page; it appears once the snapshot strip has scrolled out
 * of view. Icons at rest, labels slide out on hover or focus. The primary
 * link uses the project's primary colour.
 */
export const LinkRail = ({ links, visible }: { links: ProjectLink[]; visible: boolean }) => (
  <AnimatePresence>
    {visible && links.length > 0 && (
      <motion.nav
        aria-label="Project links"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.3 }}
        className="group/rail fixed top-[180px] right-10 z-[150] hidden flex-col items-end gap-2.5 rounded-[28px] border border-line bg-[color-mix(in_srgb,var(--night-bg)_65%,transparent)] px-2 py-2.5 shadow-[0_12px_32px_rgb(0_0_0/0.28)] backdrop-blur-[24px] lg:flex"
      >
        {links.map((l) => (
          <ActionLink
            key={l.label}
            href={linkHref(l)}
            bare
            aria-label={l.label}
            className={`group/link flex items-center gap-3 rounded-full outline-none ${l.primary ? "text-t-primary" : "text-fg"}`}
          >
            <span className="type-body-sm max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover/rail:max-w-[160px] group-hover/rail:pl-3.5 group-hover/rail:opacity-100 group-focus-within/rail:max-w-[160px] group-focus-within/rail:pl-3.5 group-focus-within/rail:opacity-100">
              {l.label.replace(/\s*[↗↓]$/, "")}
            </span>
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-full group-focus-visible/link:outline-2 group-focus-visible/link:outline-t-primary ${
                l.primary
                  ? "border border-[color-mix(in_srgb,var(--theme-primary)_60%,transparent)] bg-[color-mix(in_srgb,var(--theme-primary)_14%,transparent)]"
                  : ""
              }`}
            >
              <Icon name={ICON[l.kind]} size={20} />
            </span>
          </ActionLink>
        ))}
      </motion.nav>
    )}
  </AnimatePresence>
);
