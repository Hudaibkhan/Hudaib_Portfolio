'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import {
  ArrowRight,
  FileText,
  Terminal,
  Bot,
  Layers,
} from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { AboutData } from '@/lib/types';

interface HeroSectionProps {
  about?: AboutData | null;
}

// Stagger container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Each item fades + slides up
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

// Badge pill with spring scale-in
const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.05 },
  },
};

export function HeroSection({ about }: HeroSectionProps) {
  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-28 overflow-hidden paper-texture">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column: Hero Copy & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Badge */}
            <motion.div variants={badgeVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E3D8] shadow-xs text-xs font-medium text-[#1B1B1B] mb-5 sm:mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="text-[#2F5D50] font-semibold">Available for Collaboration</span>
                <span className="text-[#8A8375] hidden xs:inline">•</span>
                <span className="text-[#8A8375] hidden xs:inline">SE Student</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="mb-3 sm:mb-4">
              <h1 className="font-display font-bold text-[2.2rem] xs:text-[2.6rem] sm:text-5xl lg:text-6xl tracking-tight text-[#1B1B1B] leading-[1.06]">
                Muhammad{' '}
                <span className="text-[#2F5D50]">
                  Hudaib
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={itemVariants} className="mb-4 sm:mb-5">
              <p className="font-display text-base xs:text-lg sm:text-xl lg:text-2xl font-semibold text-[#1B1B1B] tracking-tight">
                {about?.role || 'AI Engineer & Full-Stack Developer'}
              </p>
            </motion.div>

            {/* Pitch */}
            <motion.p
              variants={itemVariants}
              className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#8A8375] leading-relaxed max-w-xl mb-7 sm:mb-8"
            >
              {about?.pitch ||
                'Building AI agents, automation systems, and modern web apps — learning by shipping real projects, not just tutorials.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-9 sm:mb-10"
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2F5D50] text-[#F7F4EE] font-medium text-sm shadow-xs transition-all duration-300 group relative overflow-hidden"
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(47, 93, 80, 0.25)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#23473D] to-[#2F5D50]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
                <span className="relative z-10">Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300 relative z-10" />
              </motion.a>

              <motion.a
                href="#about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFFFFF] border border-[#E7E3D8] text-[#1B1B1B] font-medium text-sm shadow-xs transition-all duration-300"
                whileHover={{
                  scale: 1.03,
                  borderColor: '#2F5D50',
                  color: '#2F5D50',
                  boxShadow: '0 10px 25px -5px rgba(47, 93, 80, 0.12)'
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                About & Philosophy
              </motion.a>
            </motion.div>

            {/* Resume Link - Separate row on mobile, inline on desktop */}
            {about?.resumeUrl && (
              <motion.div variants={itemVariants} className="mb-9 sm:mb-10 sm:-mt-6">
                <motion.a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#8A8375] hover:text-[#1B1B1B] hover:bg-[#FFFFFF] hover:border hover:border-[#E7E3D8] transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </motion.a>
              </motion.div>
            )}

            {/* Stats bar */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-[#E7E3D8] w-full"
            >
              {[
                { icon: <Bot className="w-4 h-4" />, label: 'Agentic AI', sub: 'MCP & LLM Workflows' },
                { icon: <Layers className="w-4 h-4" />, label: 'Next.js 16', sub: 'Modern Full-Stack' },
                { icon: <Terminal className="w-4 h-4" />, label: 'Production', sub: 'Real-world Software' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-1.5 text-[#2F5D50] font-display font-bold text-sm sm:text-base lg:text-lg">
                    {stat.icon}
                    <span>{stat.label}</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-[#8A8375] mt-0.5">{stat.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Visual — hidden on tablet, shown from desktop */}
          <div className="hidden lg:block lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
