import React from 'react';

export interface SafeGardenLogoProps {
  variant?: 'symbol' | 'horizontal' | 'vertical' | 'full';
  theme?: 'light' | 'dark' | 'gold' | 'monochrome';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showSubtitle?: boolean;
}

/**
 * Official Safe Garden (세이프가든) Brand CI Component
 * Faithfully vectorized from the official brand CI emblem:
 * - Geometric double-line protective shield (Safe)
 * - Living green botanical leaf with natural venation (Garden / Plant Assets)
 * - Harmonized color palette matching the brand's earthy green & warm ivory identity
 */
export const SafeGardenLogo: React.FC<SafeGardenLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Color palette assignment based on theme
  const getColors = () => {
    switch (theme) {
      case 'dark':
        return {
          stroke: '#EFECE3', // Warm ivory outline for dark backgrounds
          leafFill: '#52A65A', // Fresh botanical green
          veinStroke: '#1C2C21', // Dark interior veins for high contrast
          stemStroke: '#EFECE3', // Bottom interlocking stem
          textPrimary: '#FFFFFF',
          textSecondary: '#C9B98B', // Muted gold
        };
      case 'gold':
        return {
          stroke: '#C9B98B', // Muted gold
          leafFill: '#52A65A',
          veinStroke: '#23382A',
          stemStroke: '#C9B98B',
          textPrimary: '#C9B98B',
          textSecondary: '#EFECE3',
        };
      case 'monochrome':
        return {
          stroke: 'currentColor',
          leafFill: 'currentColor',
          veinStroke: '#FFFFFF',
          stemStroke: 'currentColor',
          textPrimary: 'currentColor',
          textSecondary: 'currentColor',
        };
      case 'light':
      default:
        return {
          stroke: '#23382A', // Deep forest green
          leafFill: '#4E9C54', // Natural vibrant foliage green
          veinStroke: '#23382A',
          stemStroke: '#23382A',
          textPrimary: '#23382A',
          textSecondary: '#6F8068', // Sage green
        };
    }
  };

  const colors = getColors();

  // Size preset mapping
  const symbolSizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    custom: '',
  };

  const symbolClass = symbolSizeMap[size] || symbolSizeMap.md;

  /**
   * The core Emblem SVG (Shield + Leaf + Stem)
   */
  const renderSymbol = () => (
    <svg
      viewBox="0 0 200 215"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${symbolClass} shrink-0 transition-transform duration-300`}
      aria-label="세이프가든 공식 심볼"
    >
      {/* 1. OUTER SHIELD: Double-line silhouette */}
      {/* Top dip -> Left shoulder -> Left side -> Bottom tip -> Right side -> Right shoulder */}
      <path
        d="M 100 26 
           L 54 44 
           C 50 49 48 57 48 68 
           L 51 106 
           C 54 133 73 158 100 178 
           C 127 158 146 133 149 106 
           L 152 68 
           C 152 57 150 49 146 44 
           Z"
        stroke={colors.stroke}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. INNER SHIELD: Parallel interior contour */}
      <path
        d="M 100 42 
           L 66 56 
           C 63 60 62 66 62 74 
           L 65 104 
           C 67 124 81 144 100 160 
           C 119 144 133 124 135 104 
           L 138 74 
           C 138 66 137 60 134 56 
           L 115 48"
        stroke={colors.stroke}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. THE LEAF BODY: Lush green botanical leaf tilted toward upper right */}
      <path
        d="M 128 44 
           C 136 78 132 120 78 148 
           C 74 130 68 96 96 66 
           C 108 53 120 46 128 44 Z"
        fill={colors.leafFill}
        stroke={colors.stroke}
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* 4. LEAF VEINS & INTERLOCKING STEM */}
      {/* Central Midrib curving down into the bottom interlocking stem */}
      <path
        d="M 125 50 
           C 112 85 96 118 79 148 
           C 76 156 81 164 91 164 
           C 104 164 114 154 117 138"
        stroke={colors.veinStroke}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Side branching veins on the leaf */}
      {/* Top right side vein */}
      <path
        d="M 113 80 C 119 76 126 77 130 81"
        stroke={colors.veinStroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Middle right side vein */}
      <path
        d="M 103 100 C 111 98 120 100 124 107"
        stroke={colors.veinStroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Lower right side vein */}
      <path
        d="M 92 122 C 99 122 108 127 112 133"
        stroke={colors.veinStroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Left side vein */}
      <path
        d="M 104 90 C 96 91 88 88 83 83"
        stroke={colors.veinStroke}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );

  // 1. Symbol Only Variant
  if (variant === 'symbol') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderSymbol()}</div>;
  }

  // 2. Vertical Stacked Variant (Exact CI layout with "Safe Garden" wordmark below)
  if (variant === 'vertical' || variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {renderSymbol()}
        <div className="mt-2.5 flex flex-col items-center">
          <span
            style={{ color: colors.textPrimary }}
            className="text-2xl font-bold tracking-tight font-sans leading-none"
          >
            Safe Garden
          </span>
          {showSubtitle && (
            <span
              style={{ color: colors.textSecondary }}
              className="text-xs font-medium tracking-wider mt-1.5 uppercase"
            >
              세이프가든 · 식물자산 종합관리
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. Horizontal Header/Navbar Variant
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
