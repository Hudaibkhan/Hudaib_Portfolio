'use client';

import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Send,
  Check,
  Copy,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GithubIcon, LinkedinIcon } from './Icons';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { sendContactEmail } from '@/app/actions/contact';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const emailAddress = 'hudaibarif13@gmail.com';

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      formData.append('website', data.website || '');

      const result = await sendContactEmail(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Message sent successfully!',
        });
        reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message.',
        });
        // Clear error message after 8 seconds
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 8000);
      }
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Hudaibkhan',
      icon: <GithubIcon className="w-5 h-5" />,
      handle: '@Hudaibkhan',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/muhammadhudaib/',
      icon: <LinkedinIcon className="w-5 h-5" />,
      handle: 'in/muhammadhudaib',
    },
    {
      name: 'Email',
      href: `mailto:${emailAddress}`,
      icon: <Mail className="w-5 h-5" />,
      handle: emailAddress,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 border-t border-[#E7E3D8] bg-[#F7F4EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Direct CTA & Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 paper-card p-8 sm:p-10 rounded-3xl flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EE] text-[#2F5D50] text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open for Opportunities</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1B1B1B] tracking-tight mb-4">
                Let&apos;s build something impactful together.
              </h2>

              <p className="text-base text-[#8A8375] leading-relaxed mb-8">
                Whether you need autonomous AI agents, multi-agent MCP workflows, or high-speed modern web applications — I am open to freelance contracts, internships, and collaborative software engineering roles.
              </p>

              {/* Quick Copy Email Box */}
              <div className="p-4 rounded-2xl bg-[#F7F4EE] border border-[#E7E3D8] flex items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-[#2F5D50] text-[#F7F4EE] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm text-[#1B1B1B] truncate">
                    {emailAddress}
                  </span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-1.5 bg-[#FFFFFF] hover:bg-[#EBF2EE] border border-[#E7E3D8] hover:border-[#2F5D50] text-xs font-semibold text-[#2F5D50] rounded-xl flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Remote & Global Status */}
            <div className="pt-6 border-t border-[#E7E3D8] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8A8375]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="font-medium text-[#1B1B1B]">Open to Remote & Global Work</span>
              </div>

              <span className="text-[#8A8375] font-medium">Responses within 24h</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col gap-6 justify-between"
          >
            {/* Contact Form */}
            <div className="paper-card p-6 sm:p-8 rounded-3xl">
              <h3 className="font-display font-bold text-lg text-[#1B1B1B] mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[#8A8375] mb-5">
                Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  {...register('website')}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F4EE] border text-sm text-[#1B1B1B] placeholder:text-[#8A8375]/60 focus:outline-none focus:ring-1 transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#E7E3D8] focus:border-[#2F5D50] focus:ring-[#2F5D50]'
                      }`}
                    />
                    <AnimatePresence mode="wait">
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-red-600 mt-1.5 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="e.g. sarah@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F4EE] border text-sm text-[#1B1B1B] placeholder:text-[#8A8375]/60 focus:outline-none focus:ring-1 transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-[#E7E3D8] focus:border-[#2F5D50] focus:ring-[#2F5D50]'
                      }`}
                    />
                    <AnimatePresence mode="wait">
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-xs text-red-600 mt-1.5 flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">
                    Project / Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="Describe your project, timeline, or collaboration ideas..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#F7F4EE] border text-sm text-[#1B1B1B] placeholder:text-[#8A8375]/60 focus:outline-none focus:ring-1 transition-colors resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-[#E7E3D8] focus:border-[#2F5D50] focus:ring-[#2F5D50]'
                    }`}
                  />
                  <AnimatePresence mode="wait">
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-600 mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-xl flex items-start gap-2 ${
                        submitStatus.type === 'success'
                          ? 'bg-emerald-50 border border-emerald-200'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <p
                        className={`text-sm font-medium ${
                          submitStatus.type === 'success' ? 'text-emerald-800' : 'text-red-800'
                        }`}
                      >
                        {submitStatus.message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={!isValid || isPending}
                  className="w-full py-3 px-5 rounded-xl bg-[#2F5D50] text-[#F7F4EE] text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={isValid && !isPending ? { scale: 1.02, boxShadow: '0 10px 30px -5px rgba(47, 93, 80, 0.4)' } : {}}
                  whileTap={isValid && !isPending ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#23473D] to-[#2F5D50]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
                      <span className="relative z-10">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Social Network Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-card p-3.5 rounded-2xl flex items-center gap-3 group transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{
                    y: -4,
                    borderColor: '#2F5D50',
                    boxShadow: '0 10px 20px -5px rgba(47, 93, 80, 0.2)'
                  }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-[#F7F4EE] flex items-center justify-center text-[#2F5D50] transition-colors shrink-0"
                    whileHover={{
                      backgroundColor: '#EBF2EE',
                      rotate: 360,
                      scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {social.icon}
                  </motion.div>
                  <div className="overflow-hidden">
                    <span className="block text-xs font-bold text-[#1B1B1B]">
                      {social.name}
                    </span>
                    <span className="block text-[11px] text-[#8A8375] truncate">
                      {social.handle}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
