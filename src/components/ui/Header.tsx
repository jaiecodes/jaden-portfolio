// src/components/ui/Header.tsx
import { useLocation } from "react-router-dom";
import { AnimatedStroke } from "./AnimatedStroke";
import { NavLinkItem } from "./NavLinkItem";

export const Header = () => {
  const location = useLocation();

  const navLinks = [
    {
      name: "about",
      path: "/about",
      font: "font-chillax",
      type: "nav" as const,
    },
    { name: "jaden", path: "/", font: "font-borel", type: "brand" as const },
    {
      name: "work",
      path: "/work",
      font: "font-chillax",
      type: "nav" as const,
    },
  ];

  return (
    <header
      className="fixed top-0 inset-x-0 z-[200] flex justify-center items-center h-[100px] overflow-hidden backdrop-blur-md"
      style={{
        background:
          "linear-gradient(180deg, #030A11 0%, rgba(3, 10, 17, 0) 100%)",
      }}
    >
      <nav className="flex items-center gap-[40px] h-[80px]">
        {navLinks.map((link) => (
          <NavLinkItem
            key={link.path}
            {...link}
            search={link.path === "/" ? location.search : ""}
          />
        ))}
      </nav>

      <AnimatedStroke type="shooting-star" />
    </header>
  );
};
