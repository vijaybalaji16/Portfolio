import { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Menu, FileText, X } from 'lucide-react';

interface NavbarProps {
  name: string;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ name, onOpenResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 px-6 md:px-10 pt-3 pointer-events-none">
      <div className="pointer-events-auto relative max-w-[1120px] mx-auto rounded-2xl bg-gradient-to-b from-[#161822]/82 via-[#0E1016]/84 to-[#090A0E]/88 backdrop-blur-xl border border-white/[0.11] shadow-[0_14px_40px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.11)] overflow-hidden">
        {/* Subtle Champagne Top Specular Edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F2C97D]/45 to-transparent"
        />

        <div className="px-6 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Product Management Geometric Logo Mark */}
          <a
            href="#top"
            aria-label={`${name} — Back to top`}
            className="inline-flex items-center gap-2.5 text-[#FAFAFA] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C97D] rounded-md group"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover:scale-[1.04]"
            >
              <defs>
                <linearGradient id="pmLogoGold" x1="8.5" y1="7.5" x2="19.5" y2="14" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FEF0C3" />
                  <stop offset="0.55" stopColor="#F2C97D" />
                  <stop offset="1" stopColor="#D4A048" />
                </linearGradient>
              </defs>
              <rect
                x="1"
                y="1"
                width="26"
                height="26"
                rx="7"
                fill="rgba(242,201,125,0.06)"
                stroke="rgba(242,201,125,0.28)"
                strokeWidth="1.2"
              />
              <path
                d="M8.5 10.5L14 7.5L19.5 10.5L14 13.5L8.5 10.5Z"
                stroke="url(#pmLogoGold)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 14.5L14 17.5L19.5 14.5"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 18.2L14 21.2L19.5 18.2"
                stroke="rgba(242,201,125,0.52)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Zone 2: 5 Single-line Navigation Links */}
          <nav
            aria-label="Portfolio Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8B8C4]"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 hover:text-[#FEF3C7] transition-colors duration-150 whitespace-nowrap shrink-0 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-gradient-to-r after:from-[#FEF0C3] after:via-[#F2C97D] after:to-[#D4A048] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C97D] rounded-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Resume PDF Preview) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-[#08080A] bg-gradient-to-r from-[#FEF0C3] via-[#F2C97D] to-[#DFB05B] hover:brightness-105 shadow-[0_0_22px_rgba(242,201,125,0.22)] rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C97D]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.12] bg-white/[0.04] text-[#FAFAFA] hover:bg-white/[0.08] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Integrated Glass Bottom Scroll Hairline */}
        <motion.div
          style={{ scaleX }}
          className="h-[1.5px] bg-gradient-to-r from-[#C6923A] via-[#F2C97D] to-[#FEF0C3] origin-left"
          aria-hidden="true"
        />

        {/* Mobile Glass Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile Portfolio Navigation"
              className="md:hidden border-t border-white/[0.08] px-6 py-4 flex flex-col gap-2.5"
            >
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-sm font-medium text-[#E4E4E9] hover:text-[#F2C97D] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-[#08080A] bg-gradient-to-r from-[#FEF0C3] via-[#F2C97D] to-[#DFB05B] rounded-lg transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume PDF</span>
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
