import { motion } from "motion/react";
import ResumeTitle from "@/assets/svg/titles/RESUME.svg?react";
import { ArrowIcon } from "../../../components/ui/ArrowIcon";
import { Text } from "../../../components/ui/Text";

export const ResumeHeader = ({ pdfUrl }: { pdfUrl: string }) => (
  <div className="flex flex-wrap items-end gap-x-12 gap-y-6 lg:gap-x-[100px]">
    <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <ResumeTitle
        aria-label="Resume"
        role="img"
        className="h-auto w-[240px] lg:w-[320px] 2xl:w-[398px]"
      />
    </motion.h1>

    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 border-b-2 border-theme pb-3 text-theme no-underline"
    >
      <Text variant="lead" as="span" trim>
        PDF
      </Text>
      <ArrowIcon className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:size-[23px]" />
    </a>
  </div>
);
