// src/components/ui/paint.ts
// CSS paint helpers. Kept out of GradientIcon.tsx so that file exports only a
// component: ESLint's react-refresh/only-export-components flags a module that
// exports both, and `npm run lint` would fail on it.

/**
 * Stretch a conic gradient along a diagonal without rotating it. Rotation is
 * already carried by the gradient's own start angle, so this rotates into the
 * stretch axis, scales, and rotates back.
 *
 *   diagonalStretch()        -> 2:1 stretch along the 35deg axis
 *   diagonalStretch(35, 1.4) -> same axis, gentler
 *
 * A non-uniform scale does not preserve angles, so a strong ratio pulls the
 * perceived start angle off 215deg. Check against the design rather than
 * assuming the number holds.
 */
export const diagonalStretch = (angle = 35, ratio = 2) =>
  `rotate(${angle}deg) scaleY(${ratio}) rotate(${-angle}deg)`;
