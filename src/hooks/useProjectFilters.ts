import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectService } from "../domain/services/ProjectService";

export function useProjectFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read state from URL
  const query = searchParams.get("q") || "";
  const category = searchParams.get("cat") || null;
  const selectedTags = searchParams.getAll("tag");

  const availableCategories = useMemo(() => ProjectService.getCategories(), []);
  const availableTags = useMemo(() => ProjectService.getUniqueTags(), []);

  const filteredProjects = useMemo(() => {
    return ProjectService.getFiltered(query, category, selectedTags);
  }, [query, category, selectedTags]);

  const setQuery = useCallback(
    (newQuery: string) => {
      setSearchParams(
        (prev) => {
          if (newQuery) prev.set("q", newQuery);
          else prev.delete("q");
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setCategory = useCallback(
    (newCat: string | null) => {
      setSearchParams(
        (prev) => {
          if (newCat) prev.set("cat", newCat);
          else prev.delete("cat");
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      setSearchParams(
        (prev) => {
          const tags = prev.getAll("tag");
          if (tags.includes(tag)) {
            const filtered = tags.filter((t) => t !== tag);
            prev.delete("tag");
            filtered.forEach((t) => prev.append("tag", t));
          } else {
            prev.append("tag", tag);
          }
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    selectedTags,
    toggleTag,
    clearFilters,
    availableCategories,
    availableTags,
    filteredProjects,
  };
}
