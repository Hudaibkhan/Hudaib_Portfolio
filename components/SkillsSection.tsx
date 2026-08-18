'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Server,
  Bot,
  Cpu,
  Database,
  Cloud,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Skill } from '@/lib/types';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Disciplines', icon: <Layers className="w-4 h-4" /> },
    { id: 'AI', label: 'AI & Agents', icon: <Bot className="w-4 h-4" /> },
    { id: 'Automation', label: 'Automation & MCP', icon: <Cpu className="w-4 h-4" /> },
    { id: 'Frontend', label: 'Frontend', icon: <Code className="w-4 h-4" /> },
    { id: 'Backend', label: 'Backend & APIs', icon: <Server className="w-4 h-4" /> },
    { id: 'Database', label: 'Databases & CMS', icon: <Database className="w-4 h-4" /> },
    { id: 'Deployment', label: 'DevOps & Tools', icon: <Cloud className="w-4 h-4" /> },
  ];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  // Grouping for marquee ribbon
  const marqueeKeywords = [
    'AI Agents',
    'OpenAI Agents SDK',
    'MCP Servers',
    'RAG Systems',
    'FastAPI',
    'Next.js 16',
    'TypeScript',
    'Tailwind CSS',
    'Sanity CMS',
    'PostgreSQL',
    'Claude API',
    'Gemini CLI',
    'Python',
    'Docker',
  ];

  const getLevelBadgeClass = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'advanced':
        return 'bg-[#2F5D50] text-[#F7F4EE]';
      case 'intermediate':
        return 'bg-[#EBF2EE] text-[#2F5D50] border border-[#2F5D50]/20';
      case 'beginner':
      default:
        return 'bg-[#F7F4EE] text-[#8A8375] border border-[#E7E3D8]';
    }
  };

  return (
    <section id="skills" className="py-20 md:py-32 border-t border-[#E7E3D8] bg-[#F7F4EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#2F5D50] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical Arsenal</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1B1B1B] tracking-tight">
              Skills, Frameworks & Protocols
            </h2>
          </div>
          <p className="text-sm text-[#8A8375] max-w-sm">
            Curated toolkit focused on building high-reliability AI automations and snappy web applications.
          </p>
        </motion.div>

        {/* Dynamic Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 rounded-full text-[10px] xs:text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#2F5D50] text-[#F7F4EE] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#1B1B1B] border border-[#E7E3D8] hover:border-[#2F5D50]/50'
                }`}
              >
                <span className="w-3 h-3 xs:w-4 xs:h-4 flex items-center justify-center">{cat.icon}</span>
                <span className="hidden xs:inline">{cat.label}</span>
                <span className="xs:hidden">{cat.id}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill._id || skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="paper-card p-3 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                  <span className="text-[10px] xs:text-xs font-mono font-medium text-[#8A8375] truncate">
                    {skill.category}
                  </span>
                  <span
                    className={`text-[9px] xs:text-[10px] font-semibold px-1.5 xs:px-2 py-0.5 rounded-full shrink-0 ${getLevelBadgeClass(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 xs:gap-2">
                  <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-[#2F5D50] group-hover:scale-125 transition-transform shrink-0" />
                  <h4 className="font-display font-bold text-xs xs:text-sm sm:text-base text-[#1B1B1B] tracking-tight leading-tight">
                    {skill.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Animated Marquee Ribbon with Gradient Overlay */}
        <motion.div
          className="mt-16 py-4 bg-[#FFFFFF] rounded-2xl border border-[#E7E3D8] overflow-hidden shadow-xs relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

          <div className="flex whitespace-nowrap animate-marquee">
            {[...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
              <motion.div
                key={idx}
                className="inline-flex items-center gap-3 mx-4 text-xs font-mono font-medium text-[#1B1B1B]"
                whileHover={{ scale: 1.1, color: '#2F5D50' }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="text-[#2F5D50]"
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  ◆
                </motion.span>
                <span>{word}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
