'use client';

import React from 'react';
import { motion } from 'motion/react';

interface TextShimmerProps {
  children: string;
  className?: string;
  duration?: number;
}

export function TextShimmer({
  children,
  className = '',
  duration = 2
}: TextShimmerProps) {
  return (
    <motion.span
      className={`inline-block relative ${className}`}
      style={{
        background: 'linear-gradient(90deg, #1B1B1B 0%, #2F5D50 50%, #1B1B1B 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}
