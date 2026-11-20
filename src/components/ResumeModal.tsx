import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileDown, FileText, X } from 'lucide-react';
import { RESUME_PDF_URL } from '../data/defaultPortfolio';

interface ResumeModalProps {
  isOpen: boolean;
  name: string;
  onClose: () => void;
}

export function ResumeModal({ isOpen, name, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const downloadFilename = `${name.trim().replace(/\s+/g, '_')}_Resume.pdf`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[920px] bg-[#0A0B0E] border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header with Download Button */}
            <div className="bg-[#0A0B0E]/95 backdrop-blur-md border-b border-white/[0.1] px-5 md:px-7 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-[#F2C97D] shrink-0" />
                <h2
                  id="resume-modal-title"
                  className="font-display text-sm md:text-base font-semibold text-gradient-pearl truncate"
                >
                  {name} — Resume
                </h2>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={RESUME_PDF_URL}
                  download={downloadFilename}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#08080A] bg-gradient-to-r from-[#FEF0C3] via-[#F2C97D] to-[#DFB05B] hover:brightness-105 rounded-lg transition-all whitespace-nowrap"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/[0.12] bg-[#14151A] text-[#FAFAFA] hover:bg-[#F2C97D] hover:text-[#060608] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C97D]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Preview */}
            <div className="p-3 md:p-5 bg-[#060608]">
              <div className="w-full h-[75vh] min-h-[480px] rounded-xl overflow-hidden border border-white/[0.1] bg-[#121318]">
                <iframe
                  src={`${RESUME_PDF_URL}#view=FitH`}
                  title={`${name} Resume PDF`}
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
