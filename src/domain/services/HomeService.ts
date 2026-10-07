import rawData from "../../assets/data/home.json";
import type { HomeData } from "../models/Home";

const data = rawData as HomeData;

export const HomeService = {
  get(): HomeData {
    return data;
  },
};
