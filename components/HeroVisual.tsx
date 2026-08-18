'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Cpu, Network, Layers, Sparkles } from 'lucide-react';

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 480);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    // Don't render if canvas is too small
    if (width < 100 || height < 100) {
      return;
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;

      // Stop animation if canvas becomes too small
      if (width < 100 || height < 100) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener('resize', handleResize);

    // Dynamic wave / particle nodes
    const nodeCount = 36;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      radius: number;
    }[] = [];

    let centerX = width / 2;
    let centerY = height / 2;
    let radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = radius + Math.sin(i * 3) * 20;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 2,
      });
    }

    let mouseX = centerX;
    let mouseY = centerY;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      // Skip rendering if canvas is too small
      if (width < 100 || height < 100) {
        return;
      }

      // Update center and radius based on current dimensions
      centerX = width / 2;
      centerY = height / 2;
      radius = Math.max(Math.min(width, height) * 0.38, 50); // Minimum radius of 50

      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Render concentric harmonic rings in deep pine tint
      for (let ring = 1; ring <= 3; ring++) {
        ctx.beginPath();
        const baseRingRadius = radius * 0.4 * ring;
        const oscillation = Math.sin(time + ring) * 8;
        const ringRadius = Math.max(baseRingRadius + oscillation, 5); // Ensure minimum radius of 5
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(47, 93, 80, ${0.04 + ring * 0.02})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Update and connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Gentle organic orbit
        const angle = (i / nodeCount) * Math.PI * 2 + time * 0.2;
        const currentR = Math.max(radius + Math.sin(time * 2 + i) * 16, 10); // Ensure positive radius
        const targetX = centerX + Math.cos(angle) * currentR;
        const targetY = centerY + Math.sin(angle) * currentR;

        node.x += (targetX - node.x) * 0.05;
        node.y += (targetY - node.y) * 0.05;

        // Subtle mouse pull
        if (mouseActive) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            node.x += dx * force * 0.08;
            node.y += dy * force * 0.08;
          }
        }

        // Draw connections between neighboring nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.35;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(47, 93, 80, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw Node Point
        ctx.beginPath();
        const nodeRadius = Math.max(node.radius, 1); // Ensure minimum radius
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#2F5D50';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] lg:h-[480px] flex items-center justify-center">
      {/* Background radial gradient glow tailored to warm paper */}
      <div className="absolute inset-0 bg-radial from-[#2F5D50]/10 via-[#2F5D50]/3 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Interactive Topology Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair relative z-10"
      />

      {/* Central Floating Badge: AI Architecture */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        className="absolute z-20 pointer-events-none"
      >
        <div className="paper-card p-4 rounded-2xl flex flex-col items-center gap-1.5 shadow-md border border-[#E7E3D8] bg-[#FFFFFF]/95 backdrop-blur-md">
          <div className="w-11 h-11 rounded-xl bg-[#2F5D50] text-[#F7F4EE] flex items-center justify-center shadow-xs">
            <Cpu className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xs tracking-tight text-[#1B1B1B]">
            Autonomous Agent Core
          </span>
          <span className="text-[10px] text-[#8A8375] font-mono font-medium">
            MCP • RAG • FASTAPI
          </span>
        </div>
      </motion.div>

      {/* Floating Tag 1: Agentic Orchestration */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-4 sm:right-12 z-20 pointer-events-none"
      >
        <div className="paper-card px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-medium text-[#1B1B1B] shadow-xs">
          <Network className="w-3.5 h-3.5 text-[#2F5D50]" />
          <span>Multi-Agent Swarms</span>
        </div>
      </motion.div>

      {/* Floating Tag 2: Modern Full-Stack */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-10 left-4 sm:left-10 z-20 pointer-events-none"
      >
        <div className="paper-card px-3 py-2 rounded-xl flex items-center gap-2 text-xs font-medium text-[#1B1B1B] shadow-xs">
          <Layers className="w-3.5 h-3.5 text-[#2F5D50]" />
          <span>Next.js 16 + Sanity</span>
        </div>
      </motion.div>

      {/* Floating Tag 3: Verified Execution */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-6 right-8 sm:right-16 z-20 pointer-events-none"
      >
        <div className="paper-card px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-medium text-[#2F5D50] bg-[#EBF2EE] border-transparent shadow-xs">
          <Sparkles className="w-3 h-3 text-[#2F5D50]" />
          <span>Production Ready</span>
        </div>
      </motion.div>
    </div>
  );
}
