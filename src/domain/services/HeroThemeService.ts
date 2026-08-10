import rawThemes from "../../assets/data/heroThemes.json";
import type { HeroThemeData } from "../models/HeroTheme";

const themes = rawThemes as Record<string, HeroThemeData>;

export const HeroThemeService = {
  getByProjectId(id: string): HeroThemeData | undefined {
    return themes[id];
  },
};
