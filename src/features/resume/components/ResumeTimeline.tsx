import { useRef } from "react";
import type { ResumeSection } from "../../../domain/models/Resume";
import { ResumeEntryRow } from "./ResumeEntryRow";
import { ScrollLeaf } from "./ScrollLeaf";
import { Text } from "../../../components/ui/Text";
import { TONE_STYLES } from "./tones";

/** Work + education sections, with the scroll leaf running alongside them. */
export const ResumeTimeline = ({ sections }: { sections: ResumeSection[] }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative flex flex-col gap-14 xl:gap-[30px]">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-8 lg:gap-[54px]">
          <Text
            variant="h1"
            trim
            className={`whitespace-pre-line ${TONE_STYLES[section.tone].heading}`}
          >
            {section.title}
          </Text>
          <div className="flex flex-col gap-12 lg:gap-[54px] lg:pl-[45px]">
            {section.entries.map((entry) => (
              <ResumeEntryRow
                key={`${entry.title}-${entry.organization}`}
                entry={entry}
                tone={section.tone}
              />
            ))}
          </div>
        </section>
      ))}
      <ScrollLeaf target={ref} />
    </div>
  );
};
