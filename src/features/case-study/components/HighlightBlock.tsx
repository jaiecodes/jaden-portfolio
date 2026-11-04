// src/features/case-study/components/HighlightBlock.tsx
import { motion } from "motion/react";
import type { Highlight } from "../../../domain/models/Project";
import { Text } from "../../../components/ui/Text";
import { useViewport } from "../../../hooks/useViewport";
import { Media } from "./Media";

const Step = ({ label, children, result }: { label: string; children: string; result?: boolean }) => (
  <div className="flex flex-col gap-1">
    <Text variant="label" tone={result ? "highlight" : "faint"} as="h4">
      {label}
    </Text>
    <Text variant="body" tone="muted">
      {children}
    </Text>
  </div>
);

/** The one visual that proves the highlight; its caption fills the dashed slot until it exists. */
const VisualSlot = ({ visual }: { visual: Highlight["visual"] }) => {
  const { src } = visual;
  return (
    <figure className="flex w-full flex-col gap-3 lg:w-[680px] lg:shrink-0">
      <div
        className={`relative flex aspect-[680/400] items-center justify-center overflow-hidden rounded-[14px] border border-line bg-sunken ${
          src ? "" : "border-dashed"
        }`}
      >
        {src ? (
          <Media visual={{ ...visual, src }} />
        ) : (
          <p className="type-body-sm max-w-[616px] px-8 text-center text-faint">{visual.caption}</p>
        )}
      </div>
      <figcaption className="type-body-sm text-faint">{visual.caption}</figcaption>
    </figure>
  );
};

/**
 * One thing built (Figma: Highlight Block): Challenge → Approach → Result
 * beside one visual. Blocks alternate the visual's side. On phones the
 * visual follows the title.
 */
export const HighlightBlock = ({ highlight, index }: { highlight: Highlight; index: number }) => {
  const flip = index % 2 === 1;
  const desktop = useViewport().width >= 1024;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-4 lg:items-center lg:gap-20 ${flip ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
        <Text variant="label" tone="primary" as="p">
          {`Highlight ${String(index + 1).padStart(2, "0")}`}
        </Text>
        <Text variant="h2" as="h3" className="text-fg max-lg:text-[24px]">
          {highlight.title}
        </Text>
        {!desktop && <VisualSlot visual={highlight.visual} />}
        <Step label="Challenge">{highlight.challenge}</Step>
        <Step label="Approach">{highlight.approach}</Step>
        <Step label="Result" result>
          {highlight.result}
        </Step>
      </div>
      {desktop && <VisualSlot visual={highlight.visual} />}
    </motion.article>
  );
};
