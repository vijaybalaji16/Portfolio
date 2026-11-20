/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { DEFAULT_PORTFOLIO } from './data/defaultPortfolio';
import type { PortfolioData, ProductProject } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { EducationAndCraftSection } from './components/EducationAndCraftSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';

const STORAGE_KEY = 'pm_portfolio_data_v15';

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached) as PortfolioData;
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_PORTFOLIO;
  });

  const [selectedProject, setSelectedProject] = useState<ProductProject | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync saved portfolio from backend on mount so shared links stay authoritative
  useEffect(() => {
    let active = true;
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { portfolio?: PortfolioData | null } | null) => {
        if (active && data?.portfolio?.profile?.name) {
          setPortfolio(data.portfolio);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.portfolio));
          } catch {
            // Ignore storage errors
          }
        }
      })
      .catch(() => {
        // Offline / fallback to cached or default portfolio
      });
    return () => {
      active = false;
    };
  }, []);

  // Keep browser document title aligned with portfolio owner
  useEffect(() => {
    document.title = `${portfolio.profile.name} — ${portfolio.profile.role}`;
  }, [portfolio.profile.name, portfolio.profile.role]);

  const handleCopyShareLink = useCallback(async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      // Fallback if clipboard blocked
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-transparent text-[#FAFAFA]">
        <Navbar
          name={portfolio.profile.name}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <main className="flex-1 pb-8">
          <HeroSection profile={portfolio.profile} />

          <ProjectsSection
            projects={portfolio.projects}
            onSelectProject={setSelectedProject}
          />

          <ExperienceSection experiences={portfolio.experiences} />

          <EducationAndCraftSection
            education={portfolio.education}
            competencies={portfolio.competencies}
          />

          <ContactSection
            profile={portfolio.profile}
            onShareClick={handleCopyShareLink}
            copiedLink={copiedLink}
          />
        </main>

        <CaseStudyModal
          project={selectedProject}
          projects={portfolio.projects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={setSelectedProject}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          name={portfolio.profile.name}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
