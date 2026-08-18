'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Bot,
  CheckSquare,
  Workflow,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Magnetic tilt on hover
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes('furniro')) return <ShoppingBag className="w-5 h-5 text-[#2F5D50]" />;
    if (title.toLowerCase().includes('robotics') || title.toLowerCase().includes('physical ai')) return <Bot className="w-5 h-5 text-[#2F5D50]" />;
    if (title.toLowerCase().includes('todo') || title.toLowerCase().includes('quantum')) return <CheckSquare className="w-5 h-5 text-[#2F5D50]" />;
    return <Workflow className="w-5 h-5 text-[#2F5D50]" />;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="paper-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Shimmer border sweep on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(47,93,80,0.12) 0%, rgba(47,93,80,0.02) 50%, rgba(47,93,80,0.12) 100%)',
        }}
      />

      {/* Top */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF2EE] flex items-center justify-center">
              {getProjectIcon(project.title)}
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F7F4EE] border border-[#E7E3D8] text-[#2F5D50]">
              {project.category}
            </span>
          </div>

          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F5D50] bg-[#EBF2EE] px-2.5 py-0.5 rounded-full shrink-0">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(project)}
          className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-[#1B1B1B] tracking-tight group-hover:text-[#2F5D50] transition-colors mb-2.5"
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#8A8375] leading-relaxed mb-5 sm:mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack — staggered on viewport enter */}
        <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
          {project.techStack.map((tech, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + idx * 0.04, duration: 0.28, ease: 'easeOut' }}
              className="text-xs font-mono px-2 sm:px-2.5 py-1 rounded-md bg-[#F7F4EE] border border-[#E7E3D8] text-[#1B1B1B]/80 group-hover:border-[#2F5D50]/30 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 sm:pt-5 border-t border-[#E7E3D8] flex items-center justify-between gap-3">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F5D50] hover:text-[#23473D] transition-colors cursor-pointer"
        >
          <span>Case Study & Architecture</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source on GitHub"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full text-[#8A8375] hover:text-[#1B1B1B] hover:bg-[#F7F4EE] border border-transparent hover:border-[#E7E3D8] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Live Deployment"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full text-[#2F5D50] hover:bg-[#EBF2EE] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
