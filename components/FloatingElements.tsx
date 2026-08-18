'use client';

import React from 'react';
import { motion } from 'motion/react';

export function FloatingElements() {
  const elements = [
    { size: 40, top: '10%', left: '5%', delay: 0, duration: 20 },
    { size: 30, top: '20%', right: '8%', delay: 2, duration: 24 },
    { size: 50, bottom: '15%', left: '10%', delay: 4, duration: 28 },
    { size: 35, bottom: '25%', right: '15%', delay: 1, duration: 22 },
    { size: 45, top: '50%', left: '3%', delay: 3, duration: 30 },
    { size: 25, top: '70%', right: '5%', delay: 5, duration: 18 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            top: el.top,
            bottom: el.bottom,
            left: el.left,
            right: el.right,
            background: 'radial-gradient(circle, rgba(47, 93, 80, 0.06) 0%, rgba(47, 93, 80, 0) 70%)',
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
