// src/features/case-study/components/Picture.tsx
import type { ImgHTMLAttributes } from "react";
import type { Visual } from "../../../domain/models/Project";

type PictureProps = ImgHTMLAttributes<HTMLImageElement> & { visual: Visual & { src: string } };

/** A case study image, swapping to its `mobileSrc` on phones if it has one. */
export const Picture = ({ visual, ...img }: PictureProps) => (
  <picture className="contents">
    {visual.mobileSrc && <source media="(max-width: 1023px)" srcSet={visual.mobileSrc} />}
    <img src={visual.src} alt={visual.caption} {...img} />
  </picture>
);
