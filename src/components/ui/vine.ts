// src/components/ui/vine.ts
// The vine divider's geometry and colours. Kept free of JSX so VineDivider.tsx
// is only the component and its animation (react-refresh lint rule).

const PERIOD = 120; // px per wave, as drawn in Figma
const MID = 14.8;
const AMP = 2.3;
const LEAF_EVERY = 115;
const LEAF_START = 70;
const SPRIG_EVERY = 46;
const SPRIG_START = 26;

export const vineY = (x: number) => MID + AMP * Math.sin((x / PERIOD) * Math.PI * 2 - Math.PI / 2);

/** The vine as one path, a gentle sine wave across `width`. */
export function vinePath(width: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= width; x += 6) {
    pts.push(`${x === 0 ? "M" : "L"}${x.toFixed(1)} ${vineY(x).toFixed(2)}`);
  }
  return pts.join("");
}

/** Leaves alternate below and above the vine. */
export function leafPath(x: number, below: boolean): string {
  return below
    ? `M${x} 13.5C${x + 4.8} 18.9 ${x + 12} 20.7 ${x + 21.6} 18.9C${x + 15.6} 18.3 ${x + 8.4} 16.5 ${x} 13.5Z`
    : `M${x} 16C${x + 4.8} 10.6 ${x + 12} 8.8 ${x + 21.6} 10.6C${x + 15.6} 11.2 ${x + 8.4} 13 ${x} 16Z`;
}

/** Where the leaves sit along a vine of `width`. */
export function leavesFor(width: number): { x: number; below: boolean }[] {
  const leaves: { x: number; below: boolean }[] = [];
  for (let i = 0, x = LEAF_START; x < width; i++, x += LEAF_EVERY) leaves.push({ x, below: i % 2 === 1 });
  return leaves;
}

/** Where the day branch's twigs sit along a vine of `width`, alternating blossoms and buds. */
export function sprigsFor(width: number): { x: number; up: boolean; blossom: boolean }[] {
  const sprigs: { x: number; up: boolean; blossom: boolean }[] = [];
  for (let i = 0, x = SPRIG_START; x < width - 8; i++, x += SPRIG_EVERY) {
    sprigs.push({ x, up: i % 2 === 0, blossom: i % 2 === 0 });
  }
  return sprigs;
}

/** The divider's colours. Night has leaves; day has blossom sprigs. */
export interface Look {
  paint: [string, string, string, string];
  stops: [number, number, number, number];
  fly: string;
  sparkle: string;
  halo?: string;
  leaf: [string, string];
  sprig: { petal: string; centre: string; bud: string };
}

/** A project's divider colours (from its hero theme); the firefly is its primary. */
export interface DividerColors {
  trail: string;
  mid: string;
  leaf: string;
  blossom: string;
  fly: string;
}

const NIGHT: Look = {
  paint: ["#4db36f", "#76b85c", "#9ebd4a", "#efc139"],
  stops: [0, 0.36, 0.72, 1],
  fly: "#efc139",
  sparkle: "#efc139",
  leaf: ["#3e8a57", "#4db36f"],
  sprig: { petal: "#f4abba", centre: "#ea596e", bud: "#ea596e" },
};

const DAY: Look = {
  ...NIGHT,
  paint: ["#7a5a4f", "#c9748a", "#ea596e", "#f2b441"],
  stops: [0, 0.45, 0.82, 1],
  fly: "#f2b441",
  sparkle: "#ea596e",
  halo: "#f5a623",
};

/** Project pages (Figma: Mobile nav menu — every project page): the same vine in the project's colours. */
function projectLook(c: DividerColors, day: boolean): Look {
  return day
    ? {
        ...NIGHT,
        paint: ["#7a5a4f", "#7a5a4f", c.mid, c.fly],
        stops: [0, 0.35, 0.75, 1],
        fly: c.fly,
        sparkle: c.fly,
        sprig: { petal: c.blossom, centre: "#ffcc4d", bud: c.fly },
      }
    : {
        ...NIGHT,
        paint: [c.trail, c.trail, c.mid, c.fly],
        stops: [0, 0.35, 0.72, 1],
        fly: c.fly,
        sparkle: c.fly,
        leaf: [c.leaf, c.trail],
      };
}

/** Picks the colours for the current mode, in a project's colours if given. */
export const vineLook = (day: boolean, colors?: DividerColors): Look =>
  colors ? projectLook(colors, day) : day ? DAY : NIGHT;
