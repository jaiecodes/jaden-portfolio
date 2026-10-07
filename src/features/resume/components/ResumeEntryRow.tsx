import { Link } from "react-router-dom";
import type { ResumeEntry, ResumeTone } from "../../../domain/models/Resume";
import { ArrowIcon } from "../../../components/ui/ArrowIcon";
import { Board } from "../../../components/ui/Board";
import { Pill } from "../../../components/ui/Pill";
import { Text } from "../../../components/ui/Text";
import { ENTRY_GRID, TONE_STYLES } from "./tones";

interface Props {
  entry: ResumeEntry;
  tone: ResumeTone;
}

const EntryLink = ({ entry, className }: { entry: ResumeEntry; className: string }) => {
  const label = `View ${entry.title}`;
  const icon = <ArrowIcon className="size-[18px] lg:size-[23px]" />;
  return entry.isExternal ? (
    <a href={entry.href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
      {icon}
    </a>
  ) : (
    <Link to={entry.href!} aria-label={label} className={className}>
      {icon}
    </Link>
  );
};

export const ResumeEntryRow = ({ entry, tone }: Props) => {
  const style = TONE_STYLES[tone];

  return (
    <article className={`flex flex-col gap-6 xl:items-start ${ENTRY_GRID}`}>
      {/* Role + organization | date */}
      <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4 xl:flex-nowrap">
        <div className="flex max-w-[425px] flex-col gap-4 lg:gap-[35px]">
          <Text variant="title" as="h4" trim className="uppercase text-white">
            {entry.title}
          </Text>
          <Text variant="label" trim className={style.text}>
            {entry.organization}
          </Text>
        </div>
        <Text
          variant="h2"
          as="p"
          trim
          className="shrink-0 whitespace-nowrap text-white xl:w-[190px]"
        >
          {entry.date}
        </Text>
      </div>

      {/* Summary card */}
      <Board
        accent={style.color}
        rim="var(--theme-stroke)"
        fallback="var(--theme-dominant)"
        pad={20}
        className="flex flex-col gap-5 lg:gap-7 xl:col-start-3"
      >
        <div className="flex items-start justify-between gap-5">
          <Text variant="callout" trim className="text-body">
            {entry.context}
            <br />→ {entry.outcome}
          </Text>
          {entry.href && (
            <EntryLink
              entry={entry}
              className={`shrink-0 transition-transform hover:-translate-y-0.5 hover:translate-x-0.5 ${style.text}`}
            />
          )}
        </div>
        <ul className="flex flex-wrap gap-3 lg:gap-[21px]">
          {entry.tags.map((tag) => (
            <li key={tag}>
              <Pill accent={style.color}>{tag}</Pill>
            </li>
          ))}
        </ul>
      </Board>
    </article>
  );
};
