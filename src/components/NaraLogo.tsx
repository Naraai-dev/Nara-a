interface NaraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function NaraLogo({ size = 'md', showText = true }: NaraLogoProps) {
  const dimensions = {
    sm: { logoHeight: 48, textHeight: 'text-lg', spacing: 'gap-1' },
    md: { logoHeight: 80, textHeight: 'text-2xl', spacing: 'gap-2' },
    lg: { logoHeight: 110, textHeight: 'text-3xl', spacing: 'gap-4' },
    xl: { logoHeight: 140, textHeight: 'text-4xl', spacing: 'gap-5' },
  };

  const { logoHeight, textHeight, spacing } = dimensions[size];

  return (
    <div id="nara-logo-container" className={`flex flex-col items-center justify-center ${spacing}`}>
      {/* Premium SVG Ribbon "N" Logo with Editorial bronze/charcoal gradients */}
      <svg
        id="nara-ribbon-n"
        height={logoHeight}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 hover:scale-[1.02]"
      >
        <defs>
          {/* Main Editorial Slate to Bronze-Gold Gradient */}
          <linearGradient id="naraLinearGrad" x1="20" y1="20" x2="180" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C1C1C" /> {/* Editorial Charcoal */}
            <stop offset="25%" stopColor="#303025" /> 
            <stop offset="60%" stopColor="#5A5A40" /> {/* Olive Bronze Accent */}
            <stop offset="85%" stopColor="#8C8A75" /> {/* Muted Champagne Accent */}
            <stop offset="100%" stopColor="#1C1C1C" /> {/* Slate Charcoal */}
          </linearGradient>

          {/* Depth Shadow Gradient for paper-cut/ribbon look */}
          <linearGradient id="naraShadowGrad" x1="80" y1="80" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B0B0A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3A3A2F" stopOpacity="0.05" />
          </linearGradient>
          
          {/* Edge Metallic / Paper-edge Reflection */}
          <linearGradient id="metalReflect" x1="0" y1="0" x2="200" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Shadow Overlay */}
        <path
          d="M 50 130 C 50 130, 80 50, 110 50 C 130 50, 150 100, 150 100"
          stroke="url(#naraShadowGrad)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />

        {/* 3D Ribbon Loop */}
        <path
          d="M 53 126 C 45 110, 48 83, 62 67 C 76 51, 95 48, 112 59 C 128 70, 142 98, 146 112 C 150 126, 158 132, 168 126 C 178 120, 180 102, 172 82 C 168 70, 166 60, 166 50"
          stroke="url(#naraLinearGrad)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Highlight Pass */}
        <path
          d="M 53 126 C 45 110, 48 83, 62 67 C 76 51, 95 48, 112 59"
          stroke="url(#metalReflect)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.25"
        />
        
        {/* Subtle Decorative Flow Points */}
        <circle cx="166" cy="50" r="1.5" fill="#8C8A75" />
        <circle cx="53" cy="126" r="1.5" fill="#5A5A40" />
      </svg>

      {showText && (
        <div className="flex flex-col items-center">
          {/* Georgia / Lora Premium Editorial Serif typography */}
          <h1
            id="nara-text-brand"
            className={`${textHeight} font-serif font-bold tracking-[0.2em] text-[#1C1C1C] uppercase select-none`}
            style={{ fontFamily: 'Georgia, "Lora", serif' }}
          >
            Nara
          </h1>
          
          {/* Subtle thin hairline divide underneath brand */}
          <div className="w-16 h-[1px] mt-1.5 bg-[#1C1C1C]/15" />
        </div>
      )}
    </div>
  );
}
