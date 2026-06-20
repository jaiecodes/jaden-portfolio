// src/domain/models/Project.ts
export type LinkType = "github" | "figma" | "external" | "linkedin";

export interface ExternalLink {
  type: LinkType;
  url: string;
  label?: string;
}

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
