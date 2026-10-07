// src/domain/models/Project.ts
import defaultIcon from "../../assets/icons/boat.svg";

export type LinkType = "github" | "figma" | "external" | "linkedin";

export interface ExternalLink {
  type: LinkType;
  url: string;
  label?: string;
}

const LINK_LABELS: Record<LinkType, string> = {
  github: "GitHub",
  figma: "Figma",
  external: "Live Site",
  linkedin: "LinkedIn",
};

/** Display text for a project link: its own label, or one from its type. */
export const linkLabel = (link: ExternalLink): string =>
  link.label ?? LINK_LABELS[link.type];

export interface ProjectImage {
  url: string;
  caption: string;
}

export interface ProjectData {
  id: string;
  name: string;
  year: number;
  category: string;
  tags: string[];
  description: string;
  media: string[];
  role: string;
  externalLinks: ExternalLink[];
  contributions: string;
  challenges: string;
  impact: string;
  images: ProjectImage[];
  /** URL of the card icon (served from /public). Drawn as-is unless iconMask is set. */
  icon?: string;
  /** Treat `icon` as a single-colour shape and paint it with the brand gradient. */
  iconMask?: boolean;
}

export class Project {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly category: string;
  readonly tags: string[];
  readonly description: string;
  readonly media: string[];
  readonly role: string;
  readonly externalLinks: ExternalLink[];
  readonly contributions: string;
  readonly challenges: string;
  readonly impact: string;
  readonly images: ProjectImage[];
  readonly icon?: string;
  readonly iconMask: boolean;

  constructor(data: ProjectData) {
    this.id = data.id;
    this.name = data.name;
    this.year = data.year;
    this.category = data.category;
    this.tags = data.tags;
    this.description = data.description;
    this.media = data.media;
    this.role = data.role;
    this.externalLinks = data.externalLinks;
    this.contributions = data.contributions;
    this.challenges = data.challenges;
    this.impact = data.impact;
    this.images = data.images;
    this.icon = data.icon;
    this.iconMask = data.iconMask ?? false;
  }

  /** Card icon URL, falling back to the bundled boat glyph. */
  get iconUrl(): string {
    return this.icon ?? defaultIcon;
  }

  /** Whether the card should paint the icon with the brand gradient (the
   *  fallback glyph is a single-colour shape, so it always is). */
  get iconIsMask(): boolean {
    return !this.icon || this.iconMask;
  }

  matchesSearch(query: string): boolean {
    return (
      query === "" || this.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  hasCategory(category: string | null): boolean {
    return !category || this.category === category;
  }

  hasTechTags(tags: string[]): boolean {
    return tags.length === 0 || tags.every((tag) => this.tags.includes(tag));
  }
}
