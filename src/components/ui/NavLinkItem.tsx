// src/components/ui/NavLinkItem.tsx
import { NavLink } from "react-router-dom";
import { AnimatedStroke } from "./AnimatedStroke";

interface NavLinkProps {
  name: string;
  path: string;
  font: string;
  type: "nav" | "brand";
  search: string;
}

export const NavLinkItem = ({
  name,
  path,
  font,
  type,
  search,
}: NavLinkProps) => {
  return (
    <NavLink
      to={{ pathname: path, search }}
      className={({ isActive }) => {
        // Base layout for all navigation items
        const base = `${font} transition-all duration-500 flex flex-col items-center justify-center leading-none`;

        // Brand logic (the "Jaden" center tab)
        if (type === "brand") {
          return `
            ${base} min-w-26.75 text-white font-normal
            ${isActive ? "text-[42px]" : "text-[32px]"}
          `;
        }

        // Standard navigation logic (About/Work)
        return `
          ${base} min-w-23.75 text-white text-[28px] 
          ${isActive ? "uppercase font-medium" : "lowercase font-extralight"}
        `;
      }}
    >
      {({ isActive }) => (
        <>
          {/* Text span with the manual Borel font-height correction */}
          <span
            className={type === "brand" ? "relative top-2" : "relative top-0"}
          >
            {name}
          </span>

          {/* Underline animation for non-brand links */}
          {type !== "brand" && (
            <AnimatedStroke type="nav-underline" isActive={isActive} />
          )}
        </>
      )}
    </NavLink>
  );
};
