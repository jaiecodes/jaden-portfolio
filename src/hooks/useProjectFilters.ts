import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectService } from "../domain/services/ProjectService";
import type { ProjectQuery, ProjectSort } from "../domain/models/Project";

const SORTS: ProjectSort[] = ["newest", "oldest", "az"];

/** Reads the gallery query from URL params, so every filtered view is a link. */
export function readQuery(params: URLSearchParams): ProjectQuery {
  const sort = params.get("sort") as ProjectSort | null;
  return {
    query: params.get("q") ?? "",
    category: params.get("cat"),
    tech: params.getAll("tech"),
    years: params.getAll("year").map(Number).filter(Boolean),
    sort: sort && SORTS.includes(sort) ? sort : "newest",
  };
}

/** Writes a query back to params, leaving defaults out of the URL. */
function writeQuery(q: ProjectQuery): URLSearchParams {
  const p = new URLSearchParams();
  if (q.query) p.set("q", q.query);
  if (q.category) p.set("cat", q.category);
  q.tech.forEach((t) => p.append("tech", t));
  q.years.forEach((y) => p.append("year", String(y)));
  if (q.sort !== "newest") p.set("sort", q.sort);
  return p;
}

const toggle = <T,>(list: T[], value: T) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function useProjectFilters() {
  const [params, setParams] = useSearchParams();
  const q = useMemo(() => readQuery(params), [params]);

  const update = useCallback(
    (patch: Partial<ProjectQuery>) =>
      setParams((prev) => writeQuery({ ...readQuery(prev), ...patch }), { replace: true }),
    [setParams],
  );

  const projects = useMemo(() => ProjectService.find(q), [q]);

  return {
    ...q,
    projects,
    total: ProjectService.count(),
    /** How many filters beyond the category are on (for the Filters badge). */
    activeCount: q.tech.length + q.years.length + (q.sort !== "newest" ? 1 : 0),
    setQuery: (query: string) => update({ query }),
    setCategory: (category: string | null) => update({ category }),
    toggleTech: (tech: string) => update({ tech: toggle(q.tech, tech) }),
    toggleYear: (year: number) => update({ years: toggle(q.years, year) }),
    setSort: (sort: ProjectSort) => update({ sort }),
    /** Replaces the whole query, used when the filter drawer applies. */
    apply: (next: ProjectQuery) => setParams(writeQuery(next), { replace: true }),
    clear: () => setParams(new URLSearchParams(), { replace: true }),
  };
}
