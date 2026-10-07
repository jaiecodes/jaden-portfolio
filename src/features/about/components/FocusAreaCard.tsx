// src/features/about/components/FocusAreaCard.tsx
import type { FocusAreaData } from "../../../domain/models/About";
import { StrokeFrame } from "../../../components/ui/StrokeFrame";
import { Text } from "../../../components/ui/Text";
import { TONE_TEXT } from "../../../components/ui/theme";

/** A focus-area panel: theme rim and wash, coloured tag, title, blurb. */
export const FocusAreaCard = ({ area }: { area: FocusAreaData }) => (
  <StrokeFrame
    stroke={2}
    pad={{ top: 36, bottom: 36, left: 30, right: 30 }}
    className="stroke-theme flex min-h-[263px] w-full flex-col items-start justify-center gap-[28px] rounded-[10px] bg-theme/5 shadow-[inset_0px_0px_10px_5px_#211115] lg:max-w-[501px]"
  >
    <Text variant="tag" trim className={TONE_TEXT[area.tone]}>
      {area.tag}
    </Text>

    <Text variant="title" trim className="whitespace-pre-line italic text-white">
      {area.title}
    </Text>

    <Text variant="body" trim className="max-w-[369px] text-body">
      {area.description}
    </Text>
  </StrokeFrame>
);
