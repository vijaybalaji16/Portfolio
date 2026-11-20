import { motion } from 'motion/react';
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  profile: PortfolioData['profile'];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection({ profile }: HeroSectionProps) {
  const hasPortrait = Boolean(profile.portraitUrl?.trim());

  return (
    <section
      id="top"
      className="relative pt-3 pb-5 md:pt-4 md:pb-6 overflow-hidden"
    >
      {/* Subtle Obsidian Ambient Radial Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-[340px] bg-[radial-gradient(ellipse_70%_58%_at_50%_0%,rgba(242,201,125,0.11),transparent_75%)]"
      />

      <div className="relative max-w-[1120px] mx-auto px-6 md:px-10">
        <div
          className={
            hasPortrait
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch'
              : 'block'
          }
        >
          {/* Main Portfolio Intro Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className={`${
              hasPortrait ? 'lg:col-span-8' : 'w-full'
            } relative flex flex-col justify-between p-6 md:p-8 rounded-2xl surface-obsidian backdrop-blur-md border border-white/[0.1] overflow-hidden`}
          >
            {/* Subtle Gold Top Highlight Edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#F2C97D]/55 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(242,201,125,0.09),transparent_70%)]"
            />

            <div className="relative z-10">
              <h1 className="font-display text-[clamp(2.4rem,4.6vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-gradient-pearl">
                {profile.name}
              </h1>

              <p className="mt-2 font-display text-lg md:text-xl font-semibold text-gradient-gold inline-block">
                {profile.role}
              </p>

              {/* Contact & Mail directly after Name and Role */}
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-[#F4F4F6] hover:text-[#FDE68A] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F2C97D]" />
                  <span>{profile.email}</span>
                </a>
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="inline-flex items-center gap-1.5 font-mono tabular-nums text-[#D8D8E0] hover:text-[#FDE68A] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F2C97D]" />
                    <span>{profile.phone}</span>
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5 text-[#B0B0BC]">
                  <MapPin className="w-3.5 h-3.5 text-[#F2C97D]" />
                  <span>{profile.location}</span>
                </span>
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#D8D8E0] hover:text-[#FDE68A] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#D8D8E0] hover:text-[#FDE68A] transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Summary below Contact & Mail */}
            <div className="relative z-10 mt-5 pt-5 border-t border-white/[0.08]">
              <p className="text-[15px] md:text-base leading-[1.7] tracking-[0.005em] text-[#DDDDE4] max-w-[72ch]">
                {profile.subheadline}
              </p>
            </div>
          </motion.div>

          {/* Optional Portrait Image Only (when user provides a photo URL) */}
          {hasPortrait && (
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="lg:col-span-4 rounded-2xl border border-white/[0.1] surface-obsidian overflow-hidden h-[320px] lg:h-auto"
            >
              <ResilientImage
                src={profile.portraitUrl}
                alt={`Portrait of ${profile.name}`}
                title={profile.name}
                className="w-full h-full"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Subtle Gradient Hairline Section Divider */}
      <div
        aria-hidden="true"
        className="mt-5 md:mt-6 max-w-[1120px] mx-auto px-6 md:px-10"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      </div>
    </section>
  );
}
