import { Project } from "../models/Project";
import type { ProjectData } from "../models/Project";
import rawData from "../../assets/data/projects.json";

const projects: Project[] = (rawData as ProjectData[]).map(
  (d) => new Project(d),
);

const CATEGORY_ORDER = [
  "Tools Engineering",
  "Game Development",
  "Web Platforms",
  "Spatial Sensing",
];

export const ProjectService = {
  getAll(): Project[] {
    return [...projects].sort((a, b) => b.year - a.year);
  },
  getFiltered(query: string, cat: string | null, tags: string[]): Project[] {
    return projects
      .filter(
        (p) =>
          p.matchesSearch(query) && p.hasCategory(cat) && p.hasTechTags(tags),
      )
      .sort((a, b) => b.year - a.year);
  },
  /** Categories in the design's order; any not listed follow, in data order. */
  getCategories(): string[] {
    const present = Array.from(new Set(projects.map((p) => p.category)));
    const rank = (c: string) => {
      const i = CATEGORY_ORDER.indexOf(c);
      return i === -1 ? CATEGORY_ORDER.length : i;
    };
    return present.sort((a, b) => rank(a) - rank(b));
  },
  getUniqueTags(): string[] {
    const allTags = projects.flatMap((p) => p.tags);
    return Array.from(new Set(allTags)).sort();
  },
  getById(id: string): Project | undefined {
    const data = projects.find((p) => p.id === id);
    return data ? new Project(data) : undefined;
  },
};
