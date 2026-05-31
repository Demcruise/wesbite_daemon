"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const POINTS = "12,72 48,48 88,56 128,32 168,44 208,24 248,40";

export function NetworkGraph(): ReactNode {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 260 96"
      className="h-full w-full text-cyan-400/80"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="graphFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polyline
        fill="url(#graphFill)"
        stroke="none"
        points={`${POINTS} 248,96 12,96`}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={POINTS}
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
      {POINTS.split(" ").map((pair, i) => {
        const [x, y] = pair.split(",").map(Number);
        if (x === undefined || y === undefined) return null;
        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill="currentColor"
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.4 + i * 0.06 }}
          />
        );
      })}
    </svg>
  );
}
