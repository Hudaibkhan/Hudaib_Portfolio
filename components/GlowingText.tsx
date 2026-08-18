'use client';

import React from 'react';
import { motion } from 'motion/react';

interface GlowingTextProps {
  children: string;
  className?: string;
  glowColor?: string;
}

export function GlowingText({
  children,
  className = '',
  glowColor = '#2F5D50'
}: GlowingTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="absolute inset-0 blur-xl"
        style={{ color: glowColor }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.span>
      <span className="relative">{children}</span>
    </motion.span>
  );
}
