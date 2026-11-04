// src/components/ui/header/MobileMenu.tsx
import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { AboutService } from "../../../domain/services/AboutService";
import { HeroThemeService } from "../../../domain/services/HeroThemeService";
import { ResumeService } from "../../../domain/services/ResumeService";
import { SiteService } from "../../../domain/services/SiteService";
import { ActionLink } from "../ActionLink";
import { Icon } from "../Icon";
import { LanternIcon } from "../LanternIcon";
import { menuStyle } from "../palette";
import { VineDivider } from "../VineDivider";
import { ModeSwitch } from "./ModeSwitch";
import { NavUnderline } from "./NavUnderline";

/** Mobile menu: a glass panel that drops from under the header. */
export const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const panel = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { nav, menu } = SiteService.get();
  const socials = AboutService.getSocialLinks();
  const pdf = ResumeService.getPdfUrl();
  const startY = useRef<number | null>(null);
  // Over a case study the menu takes the project's palette and divider.
  const projectId = location.pathname.match(/^\/project\/([^/]+)/)?.[1];
  const project = projectId ? HeroThemeService.getByProjectId(projectId) : undefined;

  // Focus the panel and keep Tab inside it while open; Esc closes.
  useEffect(() => {
    if (!open) return;
    const root = panel.current;
    root?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !root) return;
      const items = [...root.querySelectorAll<HTMLElement>("a[href], button:not([aria-disabled])")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[300] lg:hidden"
          data-theme="projects"
          style={project ? menuStyle(project.palette) : undefined}
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-(--scrim) backdrop-blur-(--menu-scrim-blur,8px)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal
            aria-label="Menu"
            className="absolute inset-x-0 top-0 overflow-hidden rounded-b-[24px] border-b border-(--menu-rim) bg-(--glass) px-5 pb-7 shadow-[0_16px_40px_rgb(0_0_0/0.35)] backdrop-blur-(--menu-blur)"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onPointerDown={(e) => (startY.current = e.clientY)}
            onPointerUp={(e) => {
              if (startY.current !== null && startY.current - e.clientY > 60) onClose();
              startY.current = null;
            }}
          >
            <div className="relative flex h-[74px] items-center justify-between">
              <Link to="/" onClick={onClose} className="type-wordmark relative top-[12px] text-fg">
                jaden
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-[10px] border border-line bg-(--menu-close,transparent) text-fg"
              >
                <Icon name="close" size={22} />
              </button>
              <VineDivider
                className="absolute inset-x-[-20px] top-[60px]"
                colors={project && { ...project.divider, fly: project.palette.primary }}
              />
            </div>

            <nav className="mt-3" aria-label="Pages">
              {nav.menu.map((l, i) => {
                const current = location.pathname.startsWith(l.path);
                return (
                  <NavLink
                    key={l.path}
                    to={l.path}
                    onClick={onClose}
                    className={`flex h-[76px] items-center justify-between ${i < nav.menu.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <span className={`font-display text-[34px] font-medium leading-none ${current ? "text-fg" : "text-muted"}`}>
                      {l.name}
                      {current && l.path !== "/projects" && <NavUnderline show />}
                    </span>
                    <Icon name="chevron" size={22} className="text-muted" />
                  </NavLink>
                );
              })}
            </nav>

            <p className="type-label mt-6 text-(--menu-kicker)">{menu.elsewhere}</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <ActionLink key={s.url} href={s.url}>
                  {s.displayLabel}
                </ActionLink>
              ))}
              <ActionLink href={pdf}>{menu.resumePdf}</ActionLink>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="type-body flex items-center gap-3 text-muted">
                <LanternIcon size={26} className="text-fg" />
                {menu.screenMode}
              </span>
              <ModeSwitch label={menu.screenMode} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
