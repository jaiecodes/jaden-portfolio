import rawData from "../../assets/data/site.json";
import type { SiteData } from "../models/Site";

const data = rawData as SiteData;

export const SiteService = {
  get(): SiteData {
    return data;
  },
};
