import { motion } from 'motion/react';
import type { PortfolioData } from '../types/portfolio';

interface ExperienceSectionProps {
  experiences: PortfolioData['experiences'];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-5 md:py-6">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="mb-5"
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-gradient-pearl">
            Work Experience
          </h2>
          <div
            aria-hidden="true"
            className="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#F2C97D] via-[#D4A048]/70 to-transparent"
          />
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.08, 0.24),
                ease: EASE_OUT_EXPO,
              }}
              className="p-6 md:p-7 rounded-2xl surface-obsidian surface-obsidian-hover backdrop-blur-md border border-white/[0.09]"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-gradient-pearl">
                    {exp.company}
                  </h3>
                  <p className="mt-1 text-sm md:text-base font-semibold text-gradient-gold inline-block">
                    {exp.role}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#B0B0BC] shrink-0">
                  <span>{exp.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              <ul className="mt-4 pt-4 border-t border-white/[0.08] space-y-2.5">
                {exp.highlights.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed tracking-[0.005em] text-[#E6E6EC]"
                  >
                    <span
                      className="mt-2.5 w-2 h-[1.5px] rounded-full bg-gradient-to-r from-[#FEF0C3] to-[#D4A048] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
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
