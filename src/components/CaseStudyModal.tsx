import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink, FileDown, FileText, X } from 'lucide-react';
import type { DocumentFormat, ProductProject } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  project: ProductProject | null;
  projects: ProductProject[];
  onClose: () => void;
  onSelectProject: (project: ProductProject) => void;
}

function getPreviewUrl(url?: string, format?: DocumentFormat): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Google Docs -> /preview
  const docMatch = trimmed.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (docMatch?.[1]) {
    return `https://docs.google.com/document/d/${docMatch[1]}/preview`;
  }

  // Google Slides -> /preview
  const slidesMatch = trimmed.match(/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (slidesMatch?.[1]) {
    return `https://docs.google.com/presentation/d/${slidesMatch[1]}/preview`;
  }

  // Google Drive file -> /preview
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch?.[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // Canva design -> /view?embed
  const canvaMatch = trimmed.match(/canva\.com\/design\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)/);
  if (canvaMatch?.[1] && canvaMatch?.[2]) {
    return `https://www.canva.com/design/${canvaMatch[1]}/${canvaMatch[2]}/view?embed`;
  }

  // Local / direct PDF
  if (format === 'PDF' || trimmed.toLowerCase().endsWith('.pdf')) {
    return trimmed;
  }

  return null;
}

export function CaseStudyModal({
  project,
  projects,
  onClose,
  onSelectProject,
}: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const previewUrl = project
    ? getPreviewUrl(project.documentUrl, project.documentFormat)
    : null;
  const isExternalUrl = Boolean(project?.documentUrl?.match(/^https?:\/\//i));

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[920px] bg-[#0A0B0E] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl my-4"
          >
            {/* Sticky Modal Header */}
            <div className="sticky top-0 z-10 bg-[#0A0B0E]/95 backdrop-blur-md border-b border-white/[0.1] px-6 md:px-10 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#A3A3B0] truncate">
                <span className="font-medium text-[#F2C97D]">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#E4E4E9]">{project.company}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{project.year}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.12] bg-[#14151A] text-[#FAFAFA] hover:bg-[#F2C97D] hover:text-[#060608] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C97D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10">
              <h2
                id="case-study-modal-title"
                className="font-display text-2xl md:text-4xl font-semibold leading-tight tracking-tight text-gradient-pearl"
              >
                {project.title}
              </h2>
              <p className="mt-2 text-base md:text-lg text-[#D6D6DC]">{project.subtitle}</p>

              {/* Document Bar (Google Doc / Slides / DOCX / PPTX / PDF) */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/[0.1] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-[#F2C97D] shrink-0" />
                  <div className="min-w-0">
                    <span className="block text-xs font-mono text-[#A3A3B0]">
                      Project Document ({project.documentFormat || 'Google Doc'})
                    </span>
                    <span className="block text-sm font-medium text-[#FAFAFA] truncate">
                      {project.documentName ||
                        (project.documentUrl
                          ? project.documentUrl
                          : 'Document link pending — paste Google Docs URL via Edit Portfolio')}
                    </span>
                  </div>
                </div>

                {project.documentUrl && (
                  <div className="flex items-center gap-2.5 shrink-0">
                    {isExternalUrl ? (
                      <a
                        href={project.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#08080A] bg-gradient-to-r from-[#FEF0C3] via-[#F2C97D] to-[#DFB05B] hover:brightness-105 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in {project.documentFormat || 'Google Docs'}</span>
                      </a>
                    ) : (
                      <>
                        <a
                          href={project.documentUrl}
                          download={project.documentName || true}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#060608] bg-[#FAFAFA] hover:bg-[#F2C97D] rounded-lg transition-colors"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>Download {project.documentFormat || 'File'}</span>
                        </a>
                        <a
                          href={project.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#FAFAFA] border border-white/[0.14] hover:border-[#F2C97D]/50 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>New Tab</span>
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Embedded Google Docs / Slides / PDF Preview */}
              {previewUrl ? (
                <div className="mt-6 h-[540px] rounded-xl overflow-hidden border border-white/[0.1] bg-[#121318]">
                  <iframe
                    src={previewUrl}
                    title={project.title}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="mt-6 aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.1] bg-[#121318]">
                  <ResilientImage
                    src={project.imageUrl}
                    alt={project.title}
                    title={project.title}
                    className="w-full h-full"
                  />
                </div>
              )}

              {/* Structured Case Study Notes */}
              <div className="mt-8 space-y-7">
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#FAFAFA]">
                    Problem & Customer Context
                  </h3>
                  <p className="mt-2 text-sm md:text-base leading-[1.7] text-[#D6D6DC]">
                    {project.problem}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.08]">
                  <h3 className="font-display text-lg font-semibold text-[#FAFAFA]">
                    Strategic Bet & Prioritization
                  </h3>
                  <p className="mt-2 text-sm md:text-base leading-[1.7] text-[#D6D6DC]">
                    {project.strategy}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.08]">
                  <h3 className="font-display text-lg font-semibold text-[#FAFAFA]">
                    Execution & Cross-Functional Trade-offs
                  </h3>
                  <p className="mt-2 text-sm md:text-base leading-[1.7] text-[#D6D6DC]">
                    {project.execution}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.08]">
                  <h3 className="font-display text-lg font-semibold text-[#FAFAFA]">
                    Measurable Outcomes
                  </h3>
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.outcomes.map((outcome, i) => (
                      <li
                        key={i}
                        className="p-4 rounded-xl bg-[#121318] border border-white/[0.09] text-sm font-medium text-[#FAFAFA] leading-relaxed"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prev / Next Navigation */}
              <div className="mt-8 pt-6 border-t border-white/[0.1] flex items-center justify-between gap-4">
                {prevProject ? (
                  <button
                    type="button"
                    onClick={() => onSelectProject(prevProject)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#FAFAFA] hover:text-[#F2C97D] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="truncate max-w-[200px] sm:max-w-[300px]">
                      {prevProject.title}
                    </span>
                  </button>
                ) : (
                  <div />
                )}

                {nextProject && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(nextProject)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#FAFAFA] hover:text-[#F2C97D] transition-colors ml-auto"
                  >
                    <span className="truncate max-w-[200px] sm:max-w-[300px]">
                      {nextProject.title}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
