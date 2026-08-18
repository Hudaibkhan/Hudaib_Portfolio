'use client';

import React from 'react';
import { motion } from 'motion/react';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 40px -10px rgba(47, 93, 80, 0.15)',
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
