// src/features/about/components/FocusCard.tsx
import type { FocusAreaData } from "../../../domain/models/About";
import { strokeStyle } from "../../../components/ui/stroke";
import { Text } from "../../../components/ui/Text";

/** A focus area: themed kicker, title and a line of detail, in the About rim. */
export const FocusCard = ({ area }: { area: FocusAreaData }) => (
  <article
    className="stroke stroke-primary-angular flex flex-col gap-3.5 rounded-2xl bg-raised"
    style={strokeStyle({ stroke: 1.5, pad: 30 })}
  >
    <Text variant="label" tone={area.tone} as="p">
      {area.tag}
    </Text>
    <Text variant="h3" className="text-fg">
      {area.title}
    </Text>
    <Text variant="body" tone="muted">
      {area.description}
    </Text>
  </article>
);
