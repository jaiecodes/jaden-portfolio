// src/features/projects/components/ProjectLinkButton.tsx
import { linkHref, type ProjectLink } from "../../../domain/models/Project";
import { ActionLink } from "../../../components/ui/ActionLink";

/** A project link as a button: primary filled, the rest outlined. */
export const ProjectLinkButton = ({ link, className = "" }: { link: ProjectLink; className?: string }) => (
  <ActionLink href={linkHref(link)} variant={link.primary ? "primary" : "ghost"} className={className}>
    {link.label}
  </ActionLink>
);
