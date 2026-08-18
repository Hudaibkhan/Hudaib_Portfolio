'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { Project } from '@/lib/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1B1B1B]/40 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-[#E7E3D8] shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-5 right-5 p-2 rounded-full text-[#8A8375] hover:text-[#1B1B1B] hover:bg-[#F7F4EE] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Status */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF2EE] text-[#2F5D50]">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#2F5D50] text-[#F7F4EE]">
                Featured Project
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1B1B1B] tracking-tight mb-4">
            {project.title}
          </h3>

          {/* Summary */}
          <p className="text-base text-[#1B1B1B]/80 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Highlights / Key Features */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-6 bg-[#F7F4EE] p-5 rounded-2xl border border-[#E7E3D8]">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#2F5D50] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Key Engineering Highlights
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1B1B1B]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#2F5D50] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Matrix */}
          <div className="mb-8">
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-[#8A8375] mb-3">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-[#FFFFFF] border border-[#E7E3D8] text-[#1B1B1B]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E7E3D8]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2F5D50] hover:bg-[#23473D] text-[#F7F4EE] text-sm font-medium transition-colors"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E7E3D8] hover:border-[#2F5D50] text-[#1B1B1B] text-sm font-medium transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
