// src/features/about/components/AboutIntro.tsx
import { AboutService } from "../../../domain/services/AboutService";
import { ActionLink } from "../../../components/ui/ActionLink";
import { Text } from "../../../components/ui/Text";

/** "hi, i'm jaden" in the script face, the intro and the links (12px apart). */
export const AboutIntro = () => {
  const primary = AboutService.getPrimaryAction();
  return (
    <div className="flex flex-col gap-7 lg:max-w-[640px] lg:pt-[30px]">
      {/* Padding: gradient text only paints inside the box, and Borel's
          ascenders and dots overshoot its line height. */}
      <Text variant="script" className="text-gradient mt-2 -mb-[0.5em] lg:-mt-[0.7em] bg-(image:--theme-title) pt-[0.7em] pb-[0.5em]">
        {AboutService.getGreeting().map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Text>
      <Text variant="lead" tone="muted" className="max-lg:text-base max-lg:leading-[1.6]">
        {AboutService.getIntro()}
      </Text>
      <div className="flex flex-wrap gap-3">
        <ActionLink href={primary.url} variant="primary">
          {primary.label}
        </ActionLink>
        {AboutService.getSocialLinks().map((s) => (
          <ActionLink key={s.url} href={s.url}>
            {s.displayLabel}
          </ActionLink>
        ))}
      </div>
    </div>
  );
};
