import { useState } from 'react';
import { Briefcase } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  fallbackInitials?: string;
}

export function ResilientImage({
  src,
  alt,
  title,
  className = '',
  fallbackInitials,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#0D0D10] text-[#A1A1AA] p-8 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallbackInitials ? (
          <div className="w-24 h-24 rounded-full border border-[#27272A] bg-[#141417] flex items-center justify-center">
            <span className="font-display text-3xl font-medium tracking-tight text-[#F4F4F5]">
              {fallbackInitials}
            </span>
          </div>
        ) : (
          <Briefcase className="w-8 h-8 text-[#A1A1AA] mb-3" strokeWidth={1.5} />
        )}
        {title && (
          <span className="mt-4 font-display text-base text-[#E4E4E7] max-w-[220px] leading-relaxed">
            {title}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#121215] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
