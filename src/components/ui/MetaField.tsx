// src/components/ui/MetaField.tsx
import { Text } from "./Text";
import type { Surface } from "./theme";

interface MetaFieldProps {
  label: string;
  value: string;
  surface?: Surface;
}

/** A labelled fact — overline label over a bold value (Category, Role, Year). */
export const MetaField = ({ label, value, surface = "dark" }: MetaFieldProps) => (
  <div className="flex flex-col gap-2.5">
    <Text variant="overline" as="dt" className={surface === "light" ? "text-ink/60" : "text-body/60"}>
      {label}
    </Text>
    <Text variant="label" as="dd" className={surface === "light" ? "text-ink" : "text-white"}>
      {value}
    </Text>
  </div>
);
