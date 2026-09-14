// src/components/ui/Badge.tsx
export type BadgeVariant = "default" | "outline" | "tile";

const VARIANTS: Record<BadgeVariant, string> = {
  default:
    "px-2 py-0.5 rounded caption-btn-sm tracking-tighter bg-zinc-800 text-zinc-300",
  outline:
    "px-2 py-0.5 rounded caption-btn-sm tracking-tighter border border-zinc-700 text-zinc-500",
  /* Filter tile from the project card: Satoshi Bold 20px uppercase on
     Secondary at 50%, 46px tall, 20px inline padding, no radius. */
  tile: "card-tile-label grid h-[46px] w-full place-items-center px-5 bg-secondary/50 shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
};

export const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: string;
  variant?: BadgeVariant;
  className?: string;
}) => (
  <span className={`transition-colors ${VARIANTS[variant]} ${className}`}>
    {children}
  </span>
);
