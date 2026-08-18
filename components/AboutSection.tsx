'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Cpu,
  Workflow,
  Sparkles,
  Compass,
  BookOpen,
} from 'lucide-react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { AboutData } from '@/lib/types';

interface AboutSectionProps {
  about?: AboutData | null;
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm sm:text-base text-[#1B1B1B]/85 leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-bold text-lg text-[#1B1B1B] mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display font-semibold text-base text-[#1B1B1B] mt-3 mb-1.5">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base text-[#1B1B1B]/85 my-3 pl-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1.5 text-sm sm:text-base text-[#1B1B1B]/85 my-3 pl-2">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#1B1B1B]">{children}</strong>,
    em: ({ children }) => <em className="italic text-[#1B1B1B]">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded-md bg-[#F7F4EE] border border-[#E7E3D8] font-mono text-xs text-[#2F5D50]">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2F5D50] underline font-medium hover:text-[#23473D] transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export function AboutSection({ about }: AboutSectionProps) {
  const focusAreas = about?.focusAreas || [
    'AI Agents & Multi-Agent Swarms',
    'Model Context Protocol (MCP) Servers',
    'RAG Systems & Vector Retrieval',
    'FastAPI & Asynchronous Python',
    'Next.js 16 (App Router) & React 19',
    'Sanity Headless CMS Architecture',
  ];

  const highlights = [
    {
      title: 'Builder-First Mindset',
      description:
        'I prioritize building and shipping end-to-end architectures over passive tutorial consumption.',
      icon: <Code2 className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      title: 'Agentic Workflows',
      description:
        'Engineering autonomous agents capable of tool usage, dynamic planning, and human-in-the-loop validation.',
      icon: <Workflow className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      title: 'Modern Web Performance',
      description:
        'Crafting resilient, type-safe full-stack platforms with sub-second response times and accessible UX.',
      icon: <Cpu className="w-5 h-5 text-[#2F5D50]" />,
    },
  ];

  return (
    <section id="about" className="py-16 md:py-28 border-t border-[#E7E3D8] bg-[#F7F4EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#2F5D50] text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>About & Engineering Philosophy</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1B1B1B] tracking-tight">
            Engineering real-world systems at the intersection of AI and modern web.
          </h2>
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          {/* Narrative Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 paper-card p-5 sm:p-8 rounded-3xl"
          >
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#1B1B1B] mb-4 sm:mb-5 flex items-center gap-2">
              <span>Software Engineering Student & Aspiring AI Engineer</span>
            </h3>

            {/* Bio */}
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#1B1B1B]/85 leading-relaxed">
              {Array.isArray(about?.bio) ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <PortableText value={about.bio as any} components={portableTextComponents} />
              ) : typeof about?.bio === 'string' ? (
                about.bio
                  .split('\n')
                  .filter((p) => p.trim().length > 0)
                  .map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
              ) : (
                <>
                  <p>
                    Software Engineering diploma student and aspiring AI Engineer, currently focused on AI agents, MCP servers, RAG systems, and full-stack web development (Next.js, TypeScript, Sanity, FastAPI).
                  </p>
                  <p className="text-[#8A8375]">
                    My development workflow centers around rapid prototyping followed by rigorous refactoring. Rather than collecting theoretical concepts, I validate ideas by deploying live applications.
                  </p>
                </>
              )}
            </div>

            {/* Focus Areas — staggered badges */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#E7E3D8]">
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#8A8375] mb-3 sm:mb-3.5">
                Current Deep-Dive Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.35, ease: 'easeOut' }}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-medium bg-[#F7F4EE] border border-[#E7E3D8] text-[#1B1B1B] hover:border-[#2F5D50] hover:text-[#2F5D50] transition-colors cursor-default"
                  >
                    <Sparkles className="w-3 h-3 text-[#2F5D50] shrink-0" />
                    <span className="leading-tight">{area}</span>
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights Column */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 12px 30px -4px rgba(47, 93, 80, 0.12)',
                  transition: { duration: 0.2 }
                }}
                className="paper-card p-4 sm:p-5 lg:p-6 rounded-2xl flex items-start gap-3 sm:gap-4 cursor-pointer"
              >
                <motion.div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBF2EE] flex items-center justify-center shrink-0"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    backgroundColor: '#D4E5DE'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#1B1B1B] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#8A8375] leading-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Learning Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-[#2F5D50] text-[#F7F4EE] flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#A3C1B5] shrink-0" />
                <div>
                  <h5 className="font-display font-bold text-sm">Continuous Learner</h5>
                  <p className="text-xs text-[#EBF2EE]/80">Software Engineering Diploma</p>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#FFFFFF]/15 text-[#FFFFFF] shrink-0 ml-2">
                Active
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
