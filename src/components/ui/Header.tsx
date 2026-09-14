// src/components/ui/Header.tsx
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatedStroke } from "./AnimatedStroke";
import { NavLinkItem } from "./NavLinkItem";

const navLinks = [
  { name: "about", path: "/about", font: "font-chillax", type: "nav" as const },
  { name: "jaden", path: "/", font: "font-borel", type: "brand" as const },
  { name: "work", path: "/work", font: "font-chillax", type: "nav" as const },
];

// Destinations reached from the logo (home) go in the mobile drawer instead.
const menuLinks = navLinks.filter((l) => l.type === "nav");

export const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the drawer whenever the route changes (covers back/forward too).
  // Adjusting state during render rather than in an effect avoids a cascading
  // re-render round-trip. See "You Might Not Need an Effect".
  const [lastPath, setLastPath] = useState(location.pathname);
  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setMenuOpen(false);
  }

  // Close on Escape while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[200] flex h-[100px] items-center justify-center overflow-hidden backdrop-blur-md"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        {/* Desktop: centered nav (lg and up) */}
        <nav className="hidden h-[80px] items-center gap-[40px] lg:flex">
          {navLinks.map((link) => (
            <NavLinkItem
              key={link.path}
              {...link}
              search={link.path === "/" ? location.search : ""}
            />
          ))}
        </nav>

        {/* Mobile: logo left, hamburger right (below lg) */}
        <div className="absolute inset-0 flex items-center justify-between px-[17px] lg:hidden">
          <NavLink
            to={{ pathname: "/", search: location.search }}
            className="font-borel text-[32px] leading-none text-white"
            aria-label="Home"
          >
            <span className="relative top-1.5">jaden</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`absolute h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>

        <AnimatedStroke type="shooting-star" />
      </header>

      {/* Mobile drawer — sits outside the header's overflow clip */}
      <div
        className={`fixed inset-0 z-[190] lg:hidden ${
          menuOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel drops from just below the header */}
        <nav
          className={`absolute inset-x-0 top-[100px] flex flex-col gap-4 border-b border-white/10 bg-ink/95 px-[17px] py-6 backdrop-blur-md transition-all duration-300 ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          }`}
        >
          {menuLinks.map((link) => (
            <NavLink
              key={link.path}
              to={{ pathname: link.path, search: "" }}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-chillax text-[32px] lowercase transition-colors ${
                  isActive ? "font-medium text-accent" : "text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};
