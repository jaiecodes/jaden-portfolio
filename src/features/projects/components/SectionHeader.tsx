// src/features/projects/components/SectionHeader.tsx
import { Text } from "../../../components/ui/Text";

/** A kicker over a section title ("What I built" / "Results"). */
export const SectionHeader = ({ kicker, title }: { kicker: string; title: string }) => (
  <header className="flex flex-col gap-3">
    <Text variant="label" tone="primary" as="p">
      {kicker}
    </Text>
    <Text variant="h1" as="h2" className="text-fg">
      {title}
    </Text>
  </header>
);
