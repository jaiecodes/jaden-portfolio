import rawData from "../../assets/data/about.json";
import {
  SocialLink,
  type AboutData,
  type FocusAreasData,
} from "../models/About";

const data = rawData as AboutData;
const socials = data.socials.map((s) => new SocialLink(s));

export const AboutService = {
  getIntro(): string {
    return data.intro;
  },
  getSocialLinks(): SocialLink[] {
    return socials;
  },
  getFocusAreas(): FocusAreasData {
    return data.focusAreas;
  },
};
