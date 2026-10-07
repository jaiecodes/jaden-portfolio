// src/features/about/components/SocialLinks.tsx
import type { SocialLink } from "../../../domain/models/About";
import { buttonClass } from "../../../components/ui/buttonStyles";

/** Row of outlined social buttons. Gold on purpose: they stand apart from
 *  the green About theme. */
export const SocialLinks = ({ links }: { links: SocialLink[] }) => (
  <div className="flex w-full flex-wrap items-center justify-between gap-4">
    {links.map((link) => (
      <a
        key={link.label}
        href={link.url}
        {...(link.isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={buttonClass({ variant: "outline", tone: "accent", size: "md" })}
      >
        {link.label}
      </a>
    ))}
  </div>
);
