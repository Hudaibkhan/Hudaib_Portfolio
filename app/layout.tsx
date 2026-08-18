import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: '#F7F4EE',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Muhammad Hudaib — AI Engineer & Full-Stack Developer',
  description:
    'Personal portfolio of Muhammad Hudaib. Building AI agents, automation systems, and modern web apps with Next.js, FastAPI, Sanity CMS, and Agentic AI.',
  keywords: [
    'Muhammad Hudaib',
    'AI Engineer',
    'Full-Stack Developer',
    'Frontend Development',
    'Backend Development',
    'AI Agents',
    'MCP Servers',
    'Next.js',
    'FastAPI',
    'Sanity CMS',
    'Full-Stack Engineering',
  ],
  authors: [{ name: 'Muhammad Hudaib' }],
  creator: 'Muhammad Hudaib',
  verification: {
    google: 'IHnVSigFZb-TC7ewqYIj16IYGI-EPKxwYCP4bx4lc2w',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hudaib-portfolio.vercel.app',
    title: 'Muhammad Hudaib — AI Engineer & Full-Stack Developer',
    description:
      'Building AI agents, automation systems, and modern web apps — learning by shipping real projects.',
    siteName: 'Muhammad Hudaib Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Hudaib — AI Engineer & Full-Stack Developer',
    description:
      'Building AI agents, automation systems, and modern web apps — learning by shipping real projects.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F7F4EE] text-[#1B1B1B] font-sans antialiased selection:bg-[#2F5D50] selection:text-[#F7F4EE]">
        {children}
      </body>
    </html>
  );
}
 