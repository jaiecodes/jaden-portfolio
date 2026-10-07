import { isExternalUrl } from "./Link";

/** Brand colours a focus-area tag can use (tokens in index.css). */
export type FocusTone = "primary" | "accent" | "blush";

export interface SocialLinkData {
  label: string;
  url: string;
}

export interface FocusAreaData {
  tag: string;
  tone: FocusTone;
  /** May contain "\n" for a deliberate line break. */
  title: string;
  description: string;
}

export interface FocusAreasData {
  title: string;
  intro: string;
  items: FocusAreaData[];
}

export interface AboutData {
  intro: string;
  socials: SocialLinkData[];
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
}
