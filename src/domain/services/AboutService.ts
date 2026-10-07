import rawData from "../../assets/data/about.json";
import { SocialLink, type AboutData, type FocusAreasData } from "../models/About";

const data = rawData as AboutData;
const socials = data.socials.map((s) => new SocialLink(s));

export const AboutService = {
  getGreeting(): string[] {
    return data.greeting;
  },
  getIntro(): string {
    return data.intro;
  },
  getPrimaryAction(): SocialLink {
    return new SocialLink(data.primaryAction);
  },
  getSocialLinks(): SocialLink[] {
    return socials;
  },
  getModelHint(): string {
    return data.modelHint;
  },
  getFocusAreas(): FocusAreasData {
    return data.focusAreas;
  },
};
