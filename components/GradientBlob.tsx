'use client';

import React from 'react';
import { motion } from 'motion/react';

interface GradientBlobProps {
  className?: string;
  delay?: number;
}

export function GradientBlob({ className = '', delay = 0 }: GradientBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -30, 0],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}
