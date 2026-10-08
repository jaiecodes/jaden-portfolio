// src/features/about/components/FocusAreas.tsx
import { AboutService } from "../../../domain/services/AboutService";
import { Text } from "../../../components/ui/Text";
import { FocusCard } from "./FocusCard";

/** "What I'm into right now" and its three cards. */
export const FocusAreas = () => {
  const f = AboutService.getFocusAreas();
  return (
    <section className="flex flex-col gap-10 lg:gap-[60px]">
      <header className="flex flex-col gap-3.5">
        <Text variant="label" tone="primary" as="p">
          {f.kicker}
        </Text>
        <Text
          variant="h1"
          as="h2"
          className="text-gradient bg-[image:var(--focus-title,linear-gradient(90deg,var(--theme-primary),var(--theme-secondary)_60%))] pb-1 max-lg:text-[28px]"
        >
          {f.title}
        </Text>
        <Text variant="lead" tone="muted" className="max-lg:text-base">
          {f.intro}
        </Text>
      </header>
      <ul className="grid gap-5 md:grid-cols-3 lg:gap-[30px]">
        {f.items.map((area) => (
          <li key={area.title} className="flex">
            <FocusCard area={area} />
          </li>
        ))}
      </ul>
    </section>
  );
};
