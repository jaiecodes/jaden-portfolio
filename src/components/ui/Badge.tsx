// src/components/ui/Badge.tsx
export const Badge = ({
  children,
  variant = "default",
}: {
  children: string;
  variant?: "default" | "outline";
}) => {
  const base =
    "px-2 py-0.5 rounded caption-btn-sm tracking-tighter transition-colors";
  const styles =
    variant === "outline"
      ? "border border-zinc-700 text-zinc-500"
      : "bg-zinc-800 text-zinc-300";

  return <span className={`${base} ${styles}`}>{children}</span>;
};
