import type { ProductProject } from '../types/portfolio';

interface CompanyProjectThumbnailProps {
  project: ProductProject;
}

const CREEDOM_LOGO_URL = '/assets/aistudio/image_8c19ee03.png';
const LINGOPANDA_LOGO_URL = '/assets/lingopanda-logo.png';
const ZEPTO_LOGO_URL = '/assets/zepto-logo.svg';

function CompanyLogoMark({ company }: { company: string }) {
  const normalized = company.trim().toLowerCase();

  if (normalized.includes('creedom')) {
    return (
      <img
        src={CREEDOM_LOGO_URL}
        alt="Creedom logo"
        className="max-h-14 w-auto object-contain select-none"
      />
    );
  }

  if (normalized.includes('lingopanda')) {
    return (
      <img
        src={LINGOPANDA_LOGO_URL}
        alt="Lingopanda logo"
        className="max-h-11 w-auto object-contain select-none"
      />
    );
  }

  if (normalized.includes('zepto')) {
    return (
      <img
        src={ZEPTO_LOGO_URL}
        alt="Zepto logo"
        className="max-h-9 w-auto object-contain select-none"
      />
    );
  }

  if (normalized.includes('xerago')) {
    return (
      <div className="inline-flex items-center gap-2.5">
        <svg
          width="26"
          height="26"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect
            x="1"
            y="1"
            width="26"
            height="26"
            rx="7"
            fill="#0F172A"
          />
          <path
            d="M9 9L19 19M19 9L9 19"
            stroke="#FFFFFF"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
          <circle cx="14" cy="14" r="2.2" fill="#3B82F6" />
        </svg>
        <span className="font-display text-xl font-bold tracking-[0.06em] uppercase text-[#0F172A]">
          XERAGO
        </span>
      </div>
    );
  }

  if (normalized.includes('accenture')) {
    return (
      <div className="inline-flex items-center">
        <span className="relative font-display text-2xl font-bold tracking-[-0.025em] text-[#0A0A0C]">
          accen
          <span className="relative inline-block">
            t
            <svg
              width="11"
              height="9"
              viewBox="0 0 10 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="absolute -top-2 left-0"
            >
              <path
                d="M1.5 1.5L8 4.5L1.5 7.5"
                stroke="#A100FF"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          ure
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="w-7 h-7 rounded-md bg-[#0F172A] inline-flex items-center justify-center font-display text-xs font-semibold text-[#F2C97D]">
        {company.slice(0, 1).toUpperCase()}
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-[#0F172A]">
        {company}
      </span>
    </div>
  );
}

export function CompanyProjectThumbnail({ project }: CompanyProjectThumbnailProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-[#0B0C10]">
      {/* Crisp Brand Logo Plate */}
      <div className="flex-1 bg-white px-5 py-2.5 flex items-center justify-center overflow-hidden">
        <div className="transition-transform duration-300 ease-out group-hover:scale-[1.03] flex items-center justify-center">
          <CompanyLogoMark company={project.company} />
        </div>
      </div>

      {/* Project Feature Title Strip */}
      <div className="px-3 py-1.5 bg-[#0D0E12] border-t border-white/[0.08] flex items-center justify-center">
        <span className="text-xs font-medium text-[#E4E4E9] truncate text-center">
          {project.title}
        </span>
      </div>
    </div>
  );
}
