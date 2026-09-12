import React from 'react';

export interface SafeGardenLogoProps {
  variant?: 'symbol' | 'horizontal' | 'vertical' | 'full' | 'app-icon';
  theme?: 'light' | 'dark' | 'sage' | 'monochrome';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showSubtitle?: boolean;
}

/**
 * Official Safe Garden (세이프가든) Brand CI Component
 * Vectorized strictly according to the official brand identity sheet (ci_sheet.svg):
 * 
 * 1. The Earth Baseline (대지/토지): Symmetrical ground line representing land and asset stability.
 * 2. Protective Greenhouse Arch (안전/온실 아치 - Safe): Architectural dome shielding plant assets.
 * 3. Botanical Sprout & Petals (생명력/식물자산 - Garden):
 *    - Grounded center stem rising from the soil
 *    - Upward-blooming central bud (pointed leaf apex)
 *    - Symmetrical botanical curves embracing the protective arch
 * 4. Official Brand Colors:
 *    - Primary Deep Pine Green: #1E4334
 *    - Neutral Dark Charcoal: #21262B
 *    - Corporate Slate Navy: #20313E
 *    - Botanical Sage: #5E856F
 *    - Light Mint Wash: #E5EDE8
 *    - Canvas Warm Ivory: #FAF8F5
 */
export const SafeGardenLogo: React.FC<SafeGardenLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Color assignment based on official brand palette
  const getColors = () => {
    switch (theme) {
      case 'dark':
        return {
          stroke: '#FAF8F5', // Warm Ivory White
          textPrimary: '#FAF8F5',
          textSecondary: '#E5EDE8', // Soft Mint Wash
          accent: '#5E856F', // Muted Sage
          bg: '#1E4334',
        };
      case 'sage':
        return {
          stroke: '#5E856F',
          textPrimary: '#1E4334',
          textSecondary: '#5E856F',
          accent: '#5E856F',
          bg: '#E5EDE8',
        };
      case 'monochrome':
        return {
          stroke: 'currentColor',
          textPrimary: 'currentColor',
          textSecondary: 'currentColor',
          accent: 'currentColor',
          bg: 'transparent',
        };
      case 'light':
      default:
        return {
          stroke: '#1E4334', // Deep Pine Green (Primary Brand Color)
          textPrimary: '#1E4334',
          textSecondary: '#5E856F', // Muted Sage Green
          accent: '#20313E', // Corporate Slate
          bg: '#FAF8F5',
        };
    }
  };

  const colors = getColors();

  // Size mapping
  const symbolSizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    custom: '',
  };

  const symbolClass = symbolSizeMap[size] || symbolSizeMap.md;

  /**
   * The Official Emblem Vector (Earth Baseline + Greenhouse Arch + Living Botanical Sprout)
   */
  const renderSymbol = () => (
    <svg
      viewBox="0 0 120 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${symbolClass} shrink-0 transition-transform duration-300`}
      aria-label="세이프가든 공식 CI 심볼"
    >
      {/* 1. Earth Baseline (대지/토지 기저선) */}
      <line
        x1="18"
        y1="108"
        x2="102"
        y2="108"
        stroke={colors.stroke}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 2. Protective Greenhouse Arch (안전과 보호의 온실 아치 돔) */}
      <path
        d="M 32 108 L 32 64 C 32 38, 44 24, 60 24 C 76 24, 88 38, 88 64 L 88 108"
        stroke={colors.stroke}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Center Stem (토양에 뿌리내린 중심 줄기) */}
      <line
        x1="60"
        y1="108"
        x2="60"
        y2="68"
        stroke={colors.stroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* 4. Central Botanical Bud / Leaf (상승하는 중심 꽃봉오리/새싹 잎) */}
      <path
        d="M 60 32 C 48 46, 48 58, 60 68 C 72 58, 72 46, 60 32 Z"
        stroke={colors.stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. Symmetrical Side Petal Branches (아치로 확장되는 양측 잎맥 곡선) */}
      <path
        d="M 32 64 C 40 68, 50 68, 60 68 C 70 68, 80 68, 88 64"
        stroke={colors.stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // 1. Symbol Only Variant
  if (variant === 'symbol') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderSymbol()}</div>;
  }

  // 2. App Icon Variant (Rounded Squircle Badge like row 6 in CI sheet)
  if (variant === 'app-icon') {
    return (
      <div
        className={`inline-flex items-center justify-center p-2.5 rounded-2xl bg-[#1E4334] text-white shadow-md ${className}`}
      >
        <svg
          viewBox="0 0 120 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={symbolClass}
        >
          <line x1="18" y1="108" x2="102" y2="108" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path
            d="M 32 108 L 32 64 C 32 38, 44 24, 60 24 C 76 24, 88 38, 88 64 L 88 108"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="60" y1="108" x2="60" y2="68" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
          <path
            d="M 60 32 C 48 46, 48 58, 60 68 C 72 58, 72 46, 60 32 Z"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 32 64 C 40 68, 50 68, 60 68 C 70 68, 80 68, 88 64"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // 3. Vertical Stacked Variant (CI Presentation Layout)
  if (variant === 'vertical' || variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {renderSymbol()}
        <div className="mt-3 flex flex-col items-center">
          <span
            style={{ color: colors.textPrimary }}
            className="text-2xl sm:text-3xl font-bold tracking-tight font-sans leading-none"
          >
            Safe Garden
          </span>
          {showSubtitle && (
            <span
              style={{ color: colors.textSecondary }}
              className="text-xs sm:text-sm font-semibold tracking-wider mt-1.5 uppercase"
            >
              세이프가든 · 식물자산 솔루션
            </span>
          )}
        </div>
      </div>
    );
  }

  // 4. Horizontal Header/Navbar Variant
  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {renderSymbol()}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline space-x-2">
          <span
            style={{ color: colors.textPrimary }}
            className="text-xl sm:text-2xl font-bold tracking-tight leading-none"
          >
            세이프가든
          </span>
          <span
            style={{ color: colors.textSecondary }}
            className="text-xs sm:text-sm font-semibold tracking-wider uppercase leading-none font-sans"
          >
            Safe Garden
          </span>
        </div>
        {showSubtitle && (
          <span
            style={{ color: colors.textSecondary }}
            className="text-[11px] font-medium tracking-tight mt-1 hidden sm:inline-block leading-tight"
          >
            당신의 식물자산을 지켜드립니다
          </span>
        )}
      </div>
    </div>
  );
};
