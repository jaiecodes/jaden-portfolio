// src/features/about/components/FocusAreas.tsx
import type { FocusAreasData } from "../../../domain/models/About";
import { Text } from "../../../components/ui/Text";
import { FocusAreaCard } from "./FocusAreaCard";

/** "What I'm into right now": heading, intro and a row of focus cards. */
export const FocusAreas = ({ focus }: { focus: FocusAreasData }) => (
  <section className="flex w-full flex-col items-start gap-8 lg:gap-16">
    <Text variant="h1" className="w-full text-theme">
      {focus.title}
    </Text>

    <Text variant="lead" trim className="max-w-[862px] text-white/75">
      {focus.intro}
    </Text>

    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-[38px]">
      {focus.items.map((area) => (
        <FocusAreaCard key={area.tag} area={area} />
      ))}
    </div>
  </section>
);
