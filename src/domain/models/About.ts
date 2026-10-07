// src/domain/models/About.ts
import { isExternalUrl } from "./Link";

/** Theme colour a focus area's kicker uses (About: green, yellow, pink). */
export type FocusTone = "primary" | "secondary" | "accent";

export interface SocialLinkData {
  label: string;
  url: string;
}

export interface FocusAreaData {
  tag: string;
  tone: FocusTone;
  title: string;
  description: string;
}

export interface FocusAreasData {
  kicker: string;
  title: string;
  intro: string;
  items: FocusAreaData[];
}

export interface AboutData {
  /** The script greeting, one entry per line. */
  greeting: string[];
  intro: string;
  primaryAction: SocialLinkData;
  socials: SocialLinkData[];
  modelHint: string;
  focusAreas: FocusAreasData;
}

export class SocialLink {
  readonly label: string;
  readonly url: string;

  constructor(data: SocialLinkData) {
    this.label = data.label;
    this.url = data.url;
  }

  /** Web links open in a new tab; mailto: and internal routes don't. */
  get isExternal(): boolean {
    return isExternalUrl(this.url);
  }

  /** "LinkedIn ↗" for links that leave the site. */
  get displayLabel(): string {
    return this.isExternal ? `${this.label} ↗` : this.label;
  }
}
