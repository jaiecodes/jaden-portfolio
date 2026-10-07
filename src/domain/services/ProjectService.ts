import { Project } from "../models/Project";
import type { ProjectData, ProjectQuery, ProjectSort } from "../models/Project";
import rawData from "../../assets/data/projects.json";

/** In data order, which is also the gallery's order within a year. */
const projects: Project[] = (rawData as ProjectData[]).map((d) => new Project(d));

const CATEGORY_ORDER = [
  "Game Development",
  "Tools Engineering",
  "Web Platforms",
  "Spatial Sensing",
];

export interface Option<T = string> {
  value: T;
  count: number;
}

const sorters: Record<ProjectSort, (a: Project, b: Project) => number> = {
  newest: (a, b) => b.year - a.year,
  oldest: (a, b) => a.year - b.year,
  az: (a, b) => a.name.localeCompare(b.name),
};

const countBy = <T>(values: T[]): Map<T, number> => {
  const counts = new Map<T, number>();
  values.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
  return counts;
};

export const ProjectService = {
  count(): number {
    return projects.length;
  },

  /** Newest first, the gallery's default. */
  getAll(): Project[] {
    return [...projects].sort(sorters.newest);
  },

  find(q: ProjectQuery): Project[] {
    return projects
      .filter(
        (p) =>
          p.matchesSearch(q.query) &&
          p.hasCategory(q.category) &&
          p.hasTech(q.tech) &&
          p.inYears(q.years),
      )
      .sort(sorters[q.sort]);
  },

  /** Categories in the design's order, each with its project count. */
  getCategories(): Option[] {
    const counts = countBy(projects.map((p) => p.category));
    const rank = (c: string) => {
      const i = CATEGORY_ORDER.indexOf(c);
      return i === -1 ? CATEGORY_ORDER.length : i;
    };
    return [...counts.keys()]
      .sort((a, b) => rank(a) - rank(b))
      .map((value) => ({ value, count: counts.get(value)! }));
  },

  /** The most used tech first, then A–Z. */
  getTech(limit = 12): Option[] {
    const counts = countBy(projects.flatMap((p) => p.tech));
    return [...counts.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
      .slice(0, limit);
  },

  /** Newest year first. */
  getYears(): Option<number>[] {
    const counts = countBy(projects.map((p) => p.year));
    return [...counts.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.value - a.value);
  },

  getById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
  },

  /** The project after `id` in `sequence`, wrapping to the first. */
  getNext(id: string, sequence: Project[]): Project | undefined {
    const list = sequence.some((p) => p.id === id) ? sequence : this.getAll();
    const i = list.findIndex((p) => p.id === id);
    return list.length > 1 ? list[(i + 1) % list.length] : undefined;
  },
};
