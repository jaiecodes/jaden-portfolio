// src/domain/models/Resume.ts
import { isExternalUrl } from "./Link";

/**
 * Where an item sits on the resume's orange → green ramp (1 = orange, 4 =
 * green). Timeline nodes, organisation labels, chips and skill groups take
 * their colour from their step.
 */
export type ResumeStep = 1 | 2 | 3 | 4;

/** Icons a skill group can show. */
export type SkillIcon = "cube" | "chip" | "globe" | "code";

export interface ResumeEntryData {
  title: string;
  organization: string;
  date: string;
  context: string;
  tags: string[];
  step: ResumeStep;
  /** Links the card to a project case study, if that project exists. */
  projectId?: string;
  /** External link; takes precedence over projectId. */
  url?: string;
}

export interface ResumeSectionData {
  id: string;
  title: string;
  step: ResumeStep;
  entries: ResumeEntryData[];
}

export interface SkillGroupData {
  title: string;
  icon: SkillIcon;
  step: ResumeStep;
  skills: string[];
}

export interface ResumeData {
  /** Empty until the PDF is added; the download then shows as pending. */
  pdfUrl: string;
  sections: ResumeSectionData[];
  skills: { title: string; step: ResumeStep; groups: SkillGroupData[] };
}

export class ResumeEntry {
  readonly title: string;
  readonly organization: string;
  readonly date: string;
  readonly context: string;
  readonly tags: string[];
  readonly step: ResumeStep;
  /** Resolved destination, or undefined when the entry has nothing to link to. */
  readonly href?: string;

  /**
   * @param projectExists — whether `data.projectId` refers to a real project.
   *   Unknown ids are dropped so the card never links to a blank page.
   */
  constructor(data: ResumeEntryData, projectExists: boolean) {
    this.title = data.title;
    this.organization = data.organization;
    this.date = data.date;
    this.context = data.context;
    this.tags = data.tags;
    this.step = data.step;
    this.href = data.url ?? (data.projectId && projectExists ? `/project/${data.projectId}` : undefined);
  }

  get isExternal(): boolean {
    return !!this.href && isExternalUrl(this.href);
  }
}

export class ResumeSection {
  readonly id: string;
  readonly title: string;
  readonly step: ResumeStep;
  readonly entries: ResumeEntry[];

  constructor(data: ResumeSectionData, entries: ResumeEntry[]) {
    this.id = data.id;
    this.title = data.title;
    this.step = data.step;
    this.entries = entries;
  }
}
