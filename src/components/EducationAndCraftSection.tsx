import { motion } from 'motion/react';
import type { PortfolioData } from '../types/portfolio';

interface EducationAndCraftSectionProps {
  education: PortfolioData['education'];
  competencies: PortfolioData['competencies'];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function EducationAndCraftSection({
  education,
  competencies,
}: EducationAndCraftSectionProps) {
  return (
    <>
      {/* Stacked Full-Width Skills & Product Toolkit */}
      <section id="skills" className="py-5 md:py-6">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-5"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-gradient-pearl">
              Skills & Product Toolkit
            </h2>
            <div
              aria-hidden="true"
              className="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#F2C97D] via-[#D4A048]/70 to-transparent"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {competencies.map((comp, idx) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.52,
                  delay: Math.min(idx * 0.07, 0.21),
                  ease: EASE_OUT_EXPO,
                }}
                className="p-5 md:p-6 rounded-2xl surface-obsidian surface-obsidian-hover backdrop-blur-md border border-white/[0.09] flex flex-col"
              >
                <h3 className="font-display text-base md:text-lg font-semibold text-gradient-pearl pb-3 border-b border-white/[0.08]">
                  {comp.title}
                </h3>

                <ul className="mt-3.5 space-y-2">
                  {comp.methods.map((method, mIdx) => (
                    <li
                      key={mIdx}
                      className="flex items-center gap-2.5 text-sm leading-snug text-[#E6E6EC]"
                    >
                      <span
                        className="w-1.5 h-[1.5px] rounded-full bg-gradient-to-r from-[#FEF0C3] to-[#D4A048] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
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

      {/* Stacked Full-Width Education Section */}
      <section id="education" className="py-5 md:py-6">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="mb-5"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-gradient-pearl">
              Education
            </h2>
            <div
              aria-hidden="true"
              className="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#F2C97D] via-[#D4A048]/70 to-transparent"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.52,
                  delay: Math.min(index * 0.08, 0.16),
                  ease: EASE_OUT_EXPO,
                }}
                className="p-5 md:p-6 rounded-2xl surface-obsidian surface-obsidian-hover backdrop-blur-md border border-white/[0.09]"
              >
                <div className="flex items-center justify-between gap-2 text-xs font-mono tabular-nums text-[#B0B0BC]">
                  <span>{edu.period}</span>
                  <span>{edu.location}</span>
                </div>
                <h3 className="mt-2 font-display text-lg md:text-xl font-semibold text-gradient-pearl">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm font-semibold text-gradient-gold inline-block">
                  {edu.institution}
                </p>
              </motion.div>
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
    </>
  );
}
