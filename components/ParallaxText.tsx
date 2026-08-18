'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxText({ children, baseVelocity = 100 }: { children: string; baseVelocity?: number }) {
  const baseX = React.useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = React.useRef(0);

  const x = useTransform(scrollY, (latest) => {
    const velocity = latest - scrollY.getPrevious()!;
    scrollVelocity.current = velocity;
    baseX.current = baseX.current - (velocity / 100) * baseVelocity;
    return `${baseX.current}%`;
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div
        className="font-display font-semibold uppercase tracking-[-0.02em] flex whitespace-nowrap flex-nowrap"
        style={{ x }}
      >
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  );
}
