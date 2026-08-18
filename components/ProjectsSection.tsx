'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2 } from 'lucide-react';
import { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterOptions = [
    { id: 'All', label: 'All Projects' },
    { id: 'AI Project', label: 'AI & Agents' },
    { id: 'Automation', label: 'Automation & MCP' },
    { id: 'Web App', label: 'Web Applications' },
    { id: 'Full Stack', label: 'Full Stack' },
  ];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter(
          (p) => p.category?.toLowerCase() === selectedFilter.toLowerCase()
        );

  return (
    <section id="projects" className="py-20 md:py-32 border-t border-[#E7E3D8] bg-[#F7F4EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#2F5D50] text-xs font-semibold uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Engineered Work</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1B1B1B] tracking-tight">
              Featured Projects & Systems
            </h2>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filterOptions.map((opt) => {
              const active = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedFilter(opt.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#2F5D50] text-[#F7F4EE] shadow-xs'
                      : 'bg-[#FFFFFF] text-[#8A8375] border border-[#E7E3D8] hover:text-[#1B1B1B]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id || project.slug?.toString()}
                project={project}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Filter State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#E7E3D8]">
            <p className="text-[#8A8375] text-sm">No projects found in this category.</p>
            <button
              onClick={() => setSelectedFilter('All')}
              className="mt-3 text-xs font-semibold text-[#2F5D50] hover:underline cursor-pointer"
            >
              Reset Category Filter
            </button>
          </div>
        )}

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
