import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Share2,
} from 'lucide-react';
import type { PortfolioData } from '../types/portfolio';

interface ContactSectionProps {
  profile: PortfolioData['profile'];
  onShareClick: () => void;
  copiedLink: boolean;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactSection({
  profile,
  onShareClick,
  copiedLink,
}: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback if clipboard unavailable
    }
  };

  const hasSocialLinks = Boolean(
    profile.linkedinUrl || profile.githubUrl || profile.websiteUrl
  );

  return (
    <section id="contact" className="py-5 md:py-6">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        {/* Consistent Section Header Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5"
        >
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-gradient-pearl">
              Contact
            </h2>
            <div
              aria-hidden="true"
              className="mt-2 h-[2px] w-12 rounded-full bg-gradient-to-r from-[#F2C97D] via-[#D4A048]/70 to-transparent"
            />
          </div>

          <button
            type="button"
            onClick={onShareClick}
            className="no-print inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#08080A] bg-gradient-to-r from-[#FEF0C3] via-[#F2C97D] to-[#DFB05B] hover:brightness-105 shadow-[0_0_18px_rgba(242,201,125,0.2)] rounded-lg transition-all self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Portfolio Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Portfolio</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Clean One-by-One Stacked Rows (Zero Truncation, Aligned Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          className="rounded-2xl surface-obsidian backdrop-blur-md border border-white/[0.1] divide-y divide-white/[0.08]"
        >
          {/* Row 1: Email */}
          <div className="px-5 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 min-w-0">
              <div className="w-28 shrink-0 inline-flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F2C97D] shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#B0B0BC]">
                  Email
                </span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm md:text-[15px] font-medium text-[#FAFAFA] hover:text-[#FDE68A] transition-colors break-all"
              >
                {profile.email}
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#E4E4E9] hover:text-[#FEF3C7] bg-white/[0.04] hover:bg-[#F2C97D]/15 border border-white/[0.1] hover:border-[#F2C97D]/40 rounded-md transition-colors shrink-0"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#F2C97D]" />
                  <span className="text-[#F2C97D]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Row 2: Phone */}
          {profile.phone && (
            <div className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
              <div className="w-28 shrink-0 inline-flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F2C97D] shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#B0B0BC]">
                  Phone
                </span>
              </div>
              <a
                href={`tel:${profile.phone}`}
                className="font-mono tabular-nums text-sm md:text-[15px] font-medium text-[#FAFAFA] hover:text-[#FDE68A] transition-colors"
              >
                {profile.phone}
              </a>
            </div>
          )}

          {/* Row 3: Location */}
          <div className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
            <div className="w-28 shrink-0 inline-flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#F2C97D] shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-[0.08em] text-[#B0B0BC]">
                Location
              </span>
            </div>
            <span className="text-sm md:text-[15px] font-medium text-[#FAFAFA]">
              {profile.location}
            </span>
          </div>

          {/* Optional Social Links Row (only when configured) */}
          {hasSocialLinks && (
            <div className="px-5 md:px-6 py-4 flex flex-wrap items-center gap-6 text-xs font-medium">
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#D6D6DC] hover:text-[#FDE68A] transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A3A3B0]" />
                </a>
              )}
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#D6D6DC] hover:text-[#FDE68A] transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A3A3B0]" />
                </a>
              )}
              {profile.websiteUrl && (
                <a
                  href={profile.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#D6D6DC] hover:text-[#FDE68A] transition-colors"
                >
                  <span>Website / Writing</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A3A3B0]" />
                </a>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
