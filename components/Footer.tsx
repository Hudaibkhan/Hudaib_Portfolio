'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import hudaibImage from '../public/hudaib.jpg';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E7E3D8] bg-[#F7F4EE] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2F5D50] text-[#F7F4EE] flex items-center justify-center font-display font-bold text-sm">
              <Image
                src={hudaibImage}
                alt="Muhammad Hudaib"
                width={36}
                height={36}
                className="rounded-lg "
              />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-[#1B1B1B]">
                Muhammad Hudaib
              </p>
              <p className="text-xs text-[#8A8375]">
                AI Engineer & Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-[#8A8375]">
            <Link href="#about" className="hover:text-[#2F5D50] transition-colors">
              About
            </Link>
            <Link href="#projects" className="hover:text-[#2F5D50] transition-colors">
              Projects
            </Link>
            <Link href="#skills" className="hover:text-[#2F5D50] transition-colors">
              Skills
            </Link>
            <Link href="#contact" className="hover:text-[#2F5D50] transition-colors">
              Contact
            </Link>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2.5 rounded-full bg-[#FFFFFF] border border-[#E7E3D8] hover:border-[#2F5D50] text-[#1B1B1B] hover:text-[#2F5D50] shadow-xs transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-[#E7E3D8]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8A8375]">
          <p>© {new Date().getFullYear()} Muhammad Hudaib. All rights reserved.</p>
          <p>
            Crafted with Next.js 16, Sanity CMS, Tailwind CSS & Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
