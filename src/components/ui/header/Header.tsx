// src/components/ui/header/Header.tsx
import { useState, type CSSProperties } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SiteService } from "../../../domain/services/SiteService";
import { useHeaderTone } from "../../../hooks/useHeaderTone";
import { Icon } from "../Icon";
import { VineDivider } from "../VineDivider";
import { LanternButton } from "./LanternButton";
import { MobileMenu } from "./MobileMenu";
import { NavUnderline } from "./NavUnderline";

const NIGHT_HEADER = {
  "--text-primary": "#eeebe2",
  "--header-fade": "rgb(3 10 17 / 0.2)",
  "--lantern-flame": "var(--color-accent)",
  "--paint-underline": "linear-gradient(90deg, rgb(69 161 99 / 0), #45a163 25%, #efc139 50%, #c27927 75%, rgb(194 121 39 / 0))",
} as CSSProperties;

/** Header with a fade-and-blur backdrop that's strongest at the top. */
const Backdrop = () => (
  <>
    <div
      aria-hidden
      className="absolute inset-0 backdrop-blur-[20px] [mask-image:linear-gradient(#000,transparent)]"
    />
    <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-(--header-fade) to-transparent" />
  </>
);

/** A desktop nav word with the underline under the current page. */
const SideLink = ({ name, path }: { name: string; path: string }) => (
  <NavLink to={path} className={({ isActive }) => `type-button transition-colors ${isActive ? "" : "opacity-70 hover:opacity-100"}`}>
    {({ isActive }) => (
      <>
        {name}
        <NavUnderline show={isActive} />
      </>
    )}
  </NavLink>
);

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
  const [left, right] = SiteService.get().nav.side;

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(location.pathname);
  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setMenuOpen(false);
  }

  // Case studies keep their night palettes in both modes, so the header over
  // them keeps its night look too.
  const style = {
    ...(location.pathname.startsWith("/project/") ? NIGHT_HEADER : {}),
    color: tone ?? "var(--text-primary)",
  } as CSSProperties;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[200] h-[74px] lg:h-[112px]" style={style}>
        <Backdrop />

        {/* Desktop */}
        <nav aria-label="Main" className="pointer-events-auto relative hidden items-baseline justify-center gap-20 pt-10 lg:flex">
          <SideLink {...left} />
          <Link to="/" className="type-wordmark" aria-label="jaden, home">
            jaden
          </Link>
          <SideLink {...right} />
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
