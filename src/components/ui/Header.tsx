// src/components/ui/Header.tsx
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { AboutService } from "../../domain/services/AboutService";
import { ResumeService } from "../../domain/services/ResumeService";
import { useHeaderTone } from "../../hooks/useHeaderTone";
import { ActionLink } from "./ActionLink";
import { Icon } from "./Icon";
import { LanternIcon } from "./LanternIcon";
import { VineDivider } from "./VineDivider";

const SIDE_LINKS = [
  { name: "about", path: "/about" },
  { name: "resume", path: "/resume" },
];
const MENU_LINKS = [{ name: "projects", path: "/projects" }, ...SIDE_LINKS];

/** The original nav underline, shown under the current page. */
const Underline = ({ show }: { show: boolean }) => (
  <motion.span
    aria-hidden
    className="mt-1 block h-[2px] bg-[image:var(--paint-underline)] shadow-[0_-2px_6.5px_rgb(255_255_255/0.2)]"
    initial={false}
    animate={{ opacity: show ? 1 : 0, scaleX: show ? 1 : 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  />
);

/**
 * The light / dark switch. Light mode (lantern lit) isn't designed for every
 * page yet, so the switch shows the night state and says so.
 */
const LanternButton = ({ className = "" }: { className?: string }) => (
  <button
    type="button"
    aria-disabled
    aria-label="Light mode, coming soon"
    title="Light mode is coming soon"
    className={`flex size-11 items-center justify-center rounded-full ${className}`}
  >
    <LanternIcon size={26} />
  </button>
);

/** Header with a fade-and-blur backdrop that's strongest at the top. */
const Backdrop = () => (
  <>
    <div
      aria-hidden
      className="absolute inset-0 backdrop-blur-[20px] [mask-image:linear-gradient(#000,transparent)]"
    />
    <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgb(3_10_17/0.2)] to-transparent" />
  </>
);

/** Mobile menu: a glass panel that drops from under the header. */
const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const panel = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const socials = AboutService.getSocialLinks();
  const pdf = ResumeService.getPdfUrl();
  const startY = useRef<number | null>(null);

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
        <div className="fixed inset-0 z-[300] lg:hidden" data-theme="projects">
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 bg-[rgb(2_6_6/0.55)] backdrop-blur-[8px]"
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
            className="absolute inset-x-0 top-0 overflow-hidden rounded-b-[24px] border-b border-line bg-[rgb(4_10_10/0.6)] px-5 pb-7 shadow-[0_16px_40px_rgb(0_0_0/0.35)] backdrop-blur-[32px]"
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
                className="flex size-11 items-center justify-center rounded-[10px] border border-line text-fg"
              >
                <Icon name="close" size={22} />
              </button>
              {!location.pathname.startsWith("/project/") && (
                <VineDivider className="absolute inset-x-[-20px] top-[60px]" />
              )}
            </div>

            <nav className="mt-3" aria-label="Pages">
              {MENU_LINKS.map((l, i) => {
                const current = location.pathname.startsWith(l.path);
                return (
                  <NavLink
                    key={l.path}
                    to={l.path}
                    onClick={onClose}
                    className={`flex h-[76px] items-center justify-between ${i < MENU_LINKS.length - 1 ? "border-b border-line" : ""}`}
                  >
                    <span className={`font-display text-[34px] font-medium leading-none ${current ? "text-fg" : "text-muted"}`}>
                      {l.name}
                      {current && l.path !== "/projects" && <Underline show />}
                    </span>
                    <Icon name="chevron" size={22} className="text-muted" />
                  </NavLink>
                );
              })}
            </nav>

            <p className="type-label mt-6 text-primary">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <ActionLink key={s.url} href={s.url}>
                  {s.displayLabel}
                </ActionLink>
              ))}
              <ActionLink href={pdf}>Résumé PDF ↓</ActionLink>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="type-body flex items-center gap-3 text-muted">
                <LanternIcon size={26} className="text-fg" />
                Screen Mode
              </span>
              <div className="flex rounded-full border border-line p-1" role="group" aria-label="Screen Mode">
                <span className="type-button rounded-full bg-primary px-4 py-2 text-night">Night</span>
                <span className="type-button px-4 py-2 text-muted opacity-60" title="Day mode is coming soon">
                  Day
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/**
 * Header 2.0: transparent with a progressive blur, the nav words sharing one
 * baseline around the wordmark, the lantern switch at the right and the vine
 * along the bottom. The current page gets the original underline; the
 * wordmark and project pages don't. On a project's pale hero the page sets
 * the text colour (useHeaderTone).
 */
export const Header = () => {
  const location = useLocation();
  const tone = useHeaderTone();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(location.pathname);
  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setMenuOpen(false);
  }

  const style = { color: tone ?? "var(--text-primary)" } as CSSProperties;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[74px] lg:h-[112px]" style={style}>
        <Backdrop />

        {/* Desktop */}
        <nav aria-label="Main" className="pointer-events-auto relative hidden items-baseline justify-center gap-20 pt-10 lg:flex">
          <NavLink to="/about" className={({ isActive }) => `type-button transition-colors ${isActive ? "" : "opacity-70 hover:opacity-100"}`}>
            {({ isActive }) => (
              <>
                about
                <Underline show={isActive} />
              </>
            )}
          </NavLink>
          <Link to="/" className="type-wordmark" aria-label="jaden, home">
            jaden
          </Link>
          <NavLink to="/resume" className={({ isActive }) => `type-button transition-colors ${isActive ? "" : "opacity-70 hover:opacity-100"}`}>
            {({ isActive }) => (
              <>
                resume
                <Underline show={isActive} />
              </>
            )}
          </NavLink>
        </nav>
        <LanternButton className="pointer-events-auto absolute top-[34px] right-[52px] hidden lg:flex" />

        {/* Mobile */}
        <div className="pointer-events-auto relative flex h-[60px] items-center justify-between px-5 pt-2 lg:hidden">
          <Link to="/" className="type-wordmark relative top-[12px]" aria-label="jaden, home">
            jaden
          </Link>
          <div className="flex items-center gap-1">
            <LanternButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-mr-2.5 flex size-11 items-center justify-center"
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>

        {/* Project pages keep the header clear over their hero art */}
        {!location.pathname.startsWith("/project/") && (
          <VineDivider className="absolute inset-x-0 top-[60px] lg:top-[88px]" />
        )}
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
