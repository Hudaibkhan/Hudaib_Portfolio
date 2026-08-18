'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import hudaibImage from '../public/hudaib.jpg';
interface NavbarProps {
  resumeUrl?: string;
}

export function Navbar({ resumeUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#E7E3D8] shadow-xs'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5D50] rounded-lg p-1"
        >
          <motion.div
            className="w-10 h-10 rounded-xl bg-[#2F5D50] text-[#F7F4EE] flex items-center justify-center font-display font-bold text-lg shadow-sm transition-colors relative overflow-hidden"
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#3D7766] to-[#23473D]"
              initial={{ x: '-100%', y: '-100%' }}
              whileHover={{ x: 0, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <span className="relative z-10">
              <Image 
                src={hudaibImage}
                alt="Muhammad Hudaib"
                width={40}
                height={40}
                className="rounded-xl"
              />
            </span>
              
          </motion.div>
          
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-[#1B1B1B]">
              Muhammad Hudaib
            </span>
            <span className="text-xs text-[#8A8375] font-medium hidden sm:inline-block">
              AI & Full-Stack Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FFFFFF]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E7E3D8] shadow-xs">
          {navLinks.map((link) => (
            <motion.div key={link.name} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
              <Link
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-[#1B1B1B] hover:text-[#2F5D50] hover:bg-[#F7F4EE] rounded-full transition-all duration-300 relative"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Status & CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E7E3D8] rounded-full text-xs font-medium text-[#1B1B1B]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            Available for Projects
          </div>

          <motion.a
            href={resumeUrl || '#contact'}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2F5D50] text-[#F7F4EE] text-sm font-medium rounded-full shadow-xs transition-colors relative overflow-hidden"
            whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(47, 93, 80, 0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#23473D] to-[#2F5D50]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <span className="relative z-10">Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 relative z-10" />
          </motion.a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg text-[#1B1B1B] hover:bg-[#E7E3D8]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F5D50]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#FFFFFF] border-b border-[#E7E3D8] px-6 py-5 shadow-lg mx-4 my-2 rounded-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-[#1B1B1B] hover:text-[#2F5D50] hover:bg-[#F7F4EE] rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#E7E3D8] flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-4 py-2.5 bg-[#2F5D50] text-[#F7F4EE] text-sm font-semibold rounded-xl"
                >
                  Let&apos;s Collaborate
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
