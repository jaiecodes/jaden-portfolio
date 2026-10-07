// src/domain/models/Project.ts

/** What a project link does: plays the demo on the page, opens a site, the
 *  source, or a file. Decides the link rail icon. */
export type LinkKind = "video" | "site" | "source" | "download";

export interface ProjectLink {
  kind: LinkKind;
  label: string;
  /** Empty until the destination exists; the link then renders as pending.
   *  Video links ignore it and jump to the demo on the page. */
  url: string;
  /** The filled button and the primary-coloured rail icon. */
  primary?: boolean;
}

/** Where a project link points: video links play the demo on the page. */
export const linkHref = (link: ProjectLink): string => (link.kind === "video" ? "#demo" : link.url);

/** A labelled fact in the snapshot strip: a value and a quieter detail. */
export interface SnapshotFact {
  value: string;
  detail: string;
}

export interface ProjectSnapshot {
  role: SnapshotFact;
  team: SnapshotFact;
  stack: string[];
  outcome: SnapshotFact;
}

export interface Visual {
  caption: string;
  /** Image, GIF or video for the slot; the slot shows its caption until set. */
  src?: string;
}

export interface Highlight {
  title: string;
  challenge: string;
  approach: string;
  result: string;
  visual: Visual;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProjectData {
  id: string;
  name: string;
  year: number;
  category: string;
  /** Short line under the name on the "Up next" banner. */
  teaser: string;
  /** Card description. */
  summary: string;
  /** The four card tags. */
  tags: string[];
  /** Card art path without extension; `.webp` and `@2x.webp` exist. */
  cardArt: string;
  /** Line under the hero title. */
  subtitle: string;
  snapshot: ProjectSnapshot;
  links: ProjectLink[];
  video: Visual;
  problem: { heading: string; body: string; constraints: string[] };
  highlights: { heading: string; items: Highlight[] };
  stats: Stat[];
  reflection: { worked: string; differently: string };
}

/** Category names as the mobile card's kicker shortens them. */
const SHORT_CATEGORY: Record<string, string> = {
  "Game Development": "Game Dev",
  "Tools Engineering": "Tools",
  "Web Platforms": "Web",
  "Spatial Sensing": "Sensing",
};

/** Stack chips name some tech more specifically than card tags; filter by the shared name. */
const TECH_ALIASES: Record<string, string> = {
  "Unreal 5": "Unreal",
  "Spotify API": "Spotify",
};

export const shortCategory =(category: string): string => SHORT_CATEGORY[category] ?? category;

export class Project {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly category: string;
  readonly teaser: string;
  readonly summary: string;
  readonly tags: string[];
  readonly subtitle: string;
  readonly snapshot: ProjectSnapshot;
  readonly links: ProjectLink[];
  readonly video: Visual;
  readonly problem: ProjectData["problem"];
  readonly highlights: ProjectData["highlights"];
  readonly stats: Stat[];
  readonly reflection: ProjectData["reflection"];
  private readonly art: string;

  constructor(data: ProjectData) {
    this.id = data.id;
    this.name = data.name;
    this.year = data.year;
    this.category = data.category;
    this.teaser = data.teaser;
    this.summary = data.summary;
    this.tags = data.tags;
    this.subtitle = data.subtitle;
    this.snapshot = data.snapshot;
    this.links = data.links;
    this.video = data.video;
    this.problem = data.problem;
    this.highlights = data.highlights;
    this.stats = data.stats;
    this.reflection = data.reflection;
    this.art = data.cardArt;
  }

  /** "Game Development · 2026" */
  get heroLabel(): string {
    return `${this.category} · ${this.year}`;
  }

  /** "Game Dev · 2026" */
  get shortLabel(): string {
    return `${shortCategory(this.category)} · ${this.year}`;
  }

  /** "eFoil ride simulator · 2026" */
  get teaserLine(): string {
    return `${this.teaser} · ${this.year}`;
  }

  get cardArt(): { src: string; srcSet: string } {
    return { src: `${this.art}.webp`, srcSet: `${this.art}.webp 1x, ${this.art}@2x.webp 2x` };
  }

  /** Large crop of the card art, for the "Up next" banner. */
  get bannerArt(): string {
    return `${this.art}@2x.webp`;
  }

  /** Every tech the project lists, card tags first, with aliases folded together. */
  get tech(): string[] {
    return Array.from(new Set([...this.tags, ...this.snapshot.stack].map((t) => TECH_ALIASES[t] ?? t)));
  }

  matchesSearch(query: string): boolean {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return [this.name, this.category, this.summary, ...this.tech].some((s) =>
      s.toLowerCase().includes(q),
    );
  }

  hasCategory(category: string | null): boolean {
    return !category || this.category === category;
  }

  /** Matches when the project uses every selected tech. */
  hasTech(tech: string[]): boolean {
    return tech.every((t) => this.tech.includes(t));
  }

  /** Matches when the project is from any selected year. */
  inYears(years: number[]): boolean {
    return years.length === 0 || years.includes(this.year);
  }
}

export type ProjectSort = "newest" | "oldest" | "az";

export const SORT_LABELS: Record<ProjectSort, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  az: "A–Z",
};

export interface ProjectQuery {
  query: string;
  category: string | null;
  tech: string[];
  years: number[];
  sort: ProjectSort;
}
