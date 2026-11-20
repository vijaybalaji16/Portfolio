import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ProductProject, ProjectCategory } from '../types/portfolio';
import { CompanyProjectThumbnail } from './CompanyProjectThumbnail';

interface ProjectsSectionProps {
  projects: ProductProject[];
  onSelectProject: (project: ProductProject) => void;
}

const FILTER_OPTIONS: Array<'All Work' | ProjectCategory> = [
  'All Work',
  '0-to-1 Launch',
  'Platform & Scale',
  'Growth',
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'All Work' | ProjectCategory>('All Work');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All Work') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="py-5 md:py-6">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        {/* Section Header + Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5"
        >
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-gradient-pearl">
              Projects & Case Studies
            </h2>
            <div
              aria-hidden="true"
              className="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#F2C97D] via-[#D4A048]/70 to-transparent"
            />
          </div>

          <div
            role="tablist"
            aria-label="Filter product projects"
            className="no-print inline-flex flex-wrap items-center gap-1 p-1 surface-obsidian backdrop-blur-md border border-white/[0.1] rounded-xl self-start sm:self-auto"
          >
            {FILTER_OPTIONS.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C97D] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FEF0C3] via-[#F2C97D] to-[#DFB05B] text-[#08080A] font-semibold shadow-[0_0_14px_rgba(242,201,125,0.2)]'
                      : 'text-[#B0B0BC] hover:text-[#FAFAFA]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="py-10 text-center rounded-2xl border border-white/[0.09] surface-obsidian">
            <p className="font-display text-base text-[#FAFAFA]">
              No projects match this filter yet.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter('All Work')}
              className="mt-2.5 px-4 py-1.5 text-xs font-medium text-[#F2C97D] hover:underline"
            >
              Show all projects
            </button>
          </div>
        ) : (
          /* 3-Column Brand-Logo Thumbnail Blocks */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.52,
                  delay: Math.min(index * 0.08, 0.24),
                  ease: EASE_OUT_EXPO,
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="group w-full h-full flex flex-col text-left rounded-2xl surface-obsidian surface-obsidian-hover backdrop-blur-md border border-white/[0.09] hover:-translate-y-0.5 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C97D]"
                >
                  {/* Compact Inset Company Logo + Project Feature Title Thumbnail */}
                  <div className="px-4 pt-4 w-full">
                    <div className="w-full h-32 rounded-xl overflow-hidden border border-white/[0.1] group-hover:border-[#F2C97D]/30 transition-colors">
                      <CompanyProjectThumbnail project={project} />
                    </div>
                  </div>

                  {/* Single Clean Project Kind & Benefit Row */}
                  <div className="px-4 py-3.5 w-full flex items-center justify-between gap-3">
                    <h3 className="font-display text-[15px] font-semibold leading-snug tracking-tight text-[#FAFAFA] group-hover:text-[#FEF3C7] transition-colors line-clamp-2">
                      <span className="font-mono text-gradient-gold">
                        {project.projectType || project.documentFormat || 'PRD'}
                      </span>
                      <span className="mx-1.5 text-[#52525E]" aria-hidden="true">
                        ·
                      </span>
                      <span>{project.benefit || project.headlineMetric}</span>
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#A3A3B0] group-hover:text-[#F2C97D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Subtle Gradient Hairline Section Divider */}
      <div
        aria-hidden="true"
        className="mt-6 md:mt-7 max-w-[1120px] mx-auto px-6 md:px-10"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      </div>
    </section>
  );
}
