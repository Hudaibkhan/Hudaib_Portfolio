import { getProjects, getSkills, getAbout } from '@/lib/sanity';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FloatingElements } from '@/components/FloatingElements';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ParticleField } from '@/components/ParticleField';

export const revalidate = 60; // Revalidate every 60 seconds for fresh CMS updates

export default async function HomePage() {
  // Fetch data concurrently from Sanity with safe seed data fallback
  const [projects, skills, about] = await Promise.all([
    getProjects(),
    getSkills(),
    getAbout(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#1B1B1B] selection:bg-[#2F5D50] selection:text-[#F7F4EE] relative">
      {/* Animated Background Effects */}
      <AnimatedBackground />
      <ParticleField />
      <FloatingElements />
      <ScrollProgress />

      {/* Navigation Bar */}
      <Navbar resumeUrl={about?.resumeUrl} />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 relative z-10">
        {/* Hero Section */}
        <HeroSection about={about} />

        {/* About Section */}
        <AboutSection about={about} />

        {/* Projects Section */}
        <ProjectsSection projects={projects} />

        {/* Skills Section */}
        <SkillsSection skills={skills} />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
