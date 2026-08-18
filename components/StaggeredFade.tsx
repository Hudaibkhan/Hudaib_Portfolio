'use client';

import React from 'react';
import { motion } from 'motion/react';

interface StaggeredFadeProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggeredFade({
  children,
  staggerDelay = 0.1,
  initialDelay = 0
}: StaggeredFadeProps) {
  return (
    <>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: initialDelay + index * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}
