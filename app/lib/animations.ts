// Shared Framer Motion animation variants — used across landing and /student pages.
// Philosophy: subtle, fast, non-distracting. Easing is always ease-out.

import type { Variants } from "framer-motion";

/** Single element: fade up from 16px below, gentle */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Single element: fade in only (no y-shift) — for logos, icons, etc. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/** Slide in from right — for images/panels */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Container that staggers its children.
 * Use with `variants={staggerContainer}` on a motion wrapper,
 * and `variants={fadeUp}` (or any child variant) on each child.
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Slower stagger for heavier layouts (sections with >4 items) */
export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Viewport options shared across `whileInView` calls.
 * `once: true` — animate only the first time the element enters the viewport.
 * `amount: 0.2` — trigger when 20% of the element is visible.
 */
export const viewportOnce = { once: true, amount: 0.2 } as const;
