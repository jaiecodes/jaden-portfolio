// src/features/projects/components/ProjectTagGrid.tsx
import { StrokeFrame } from "../../../components/ui/StrokeFrame";
import { Badge } from "../../../components/ui/Badge";

/** The card tiles are fixed-width, so show only the first word of a tag
 *  ("Unreal Engine 5" -> "Unreal"); the filter UI still shows the full tag. */
const firstWord = (tag: string) => tag.split(" ")[0];

/**
 * 2x2 grid of technology tiles.
 *
 * Stroked on the left, right and bottom only. The top is left out of the
 * `stroke` object entirely, so that side stays at 0 and no rim is drawn
 * there: the dark panel above already closes the edge.
 *
 * Padding is exclusive of the rim, so the tiles sit 4px inside the 1.5px
 * stroke (5.5px from the box edge) on the three stroked sides, and 6px
 * from the open top.
 */
export const ProjectTagGrid = ({ tags }: { tags: string[] }) => (
  <StrokeFrame
    as="ul"
    stroke={{ left: 1.5, right: 1.5, bottom: 1.5 }}
    pad={{ top: 6, right: 4, bottom: 4, left: 4 }}
    paint="var(--paint-secondary-soft)"
    fallback="var(--paint-secondary-soft)"
    className="grid shrink-0 list-none grid-cols-2 gap-1 rounded-[1px]"
  >
    {tags.slice(0, 4).map((tag) => (
      <li key={tag} className="flex">
        <Badge variant="tile">{firstWord(tag)}</Badge>
      </li>
    ))}
  </StrokeFrame>
);
