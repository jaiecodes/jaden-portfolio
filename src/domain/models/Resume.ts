import { isExternalUrl } from "./Link";

/** Colour family a resume section is themed with (maps to a theme token). */
export type ResumeTone = "primary" | "accent";

/** Bundled icons a skill pill can show; anything else falls back to a dot. */
export type SkillIcon = "unreal" | "unity";

export interface ResumeEntryData {
  title: string;
  organization: string;
  date: string;
  context: string;
  outcome: string;
  tags: string[];
  /** Links the card to a project case study, if that project exists. */
  projectId?: string;
  /** External link; takes precedence over projectId. */
  url?: string;
}

export interface ResumeSectionData {
  id: string;
  title: string;
  tone: ResumeTone;
  entries: ResumeEntryData[];
}

export interface SkillData {
  name: string;
  icon?: SkillIcon;
}

export interface SkillGroupData {
  title: string;
  skills: SkillData[];
}

export interface ResumeData {
  pdfUrl: string;
  sections: ResumeSectionData[];
  skillGroups: SkillGroupData[];
}

export class ResumeEntry {
  readonly title: string;
  readonly organization: string;
  readonly date: string;
  readonly context: string;
  readonly outcome: string;
  readonly tags: string[];
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
    this.outcome = data.outcome;
    this.tags = data.tags;
    this.href =
      data.url ??
      (data.projectId && projectExists
        ? `/project/${data.projectId}`
        : undefined);
  }

  get isExternal(): boolean {
    return !!this.href && isExternalUrl(this.href);
  }
}

export class ResumeSection {
  readonly id: string;
  readonly title: string;
  readonly tone: ResumeTone;
  readonly entries: ResumeEntry[];

  constructor(data: ResumeSectionData, entries: ResumeEntry[]) {
    this.id = data.id;
    this.title = data.title;
    this.tone = data.tone;
    this.entries = entries;
  }
}
