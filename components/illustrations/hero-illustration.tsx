export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1F3A" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FF8C1A" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="600" height="500" fill="url(#heroGrad)" rx="24" />
      {/* Isometric platform base */}
      <path d="M100 350 L300 250 L500 350 L300 450 Z" fill="#0B1F3A" fillOpacity="0.08" stroke="#0B1F3A" strokeWidth="1.5" />
      <path d="M150 320 L300 240 L450 320 L300 400 Z" fill="#0B1F3A" fillOpacity="0.12" stroke="#0B1F3A" strokeWidth="1.5" />
      {/* Server blocks */}
      <path d="M200 280 L260 250 L260 200 L200 230 Z" fill="#0B1F3A" fillOpacity="0.15" stroke="#0B1F3A" strokeWidth="1" />
      <path d="M260 250 L320 280 L320 230 L260 200 Z" fill="#0B1F3A" fillOpacity="0.2" stroke="#0B1F3A" strokeWidth="1" />
      <path d="M200 230 L260 200 L320 230 L260 260 Z" fill="#0B1F3A" fillOpacity="0.25" stroke="#0B1F3A" strokeWidth="1" />
      {/* AI node */}
      <circle cx="300" cy="160" r="40" fill="#FF8C1A" fillOpacity="0.15" stroke="#FF8C1A" strokeWidth="2" />
      <circle cx="300" cy="160" r="20" fill="#FF8C1A" fillOpacity="0.3" />
      {/* Connection lines */}
      <line x1="300" y1="200" x2="300" y2="240" stroke="#FF8C1A" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="260" y1="230" x2="300" y2="200" stroke="#0B1F3A" strokeWidth="1.5" strokeOpacity="0.4" />
      <line x1="340" y1="260" x2="300" y2="200" stroke="#0B1F3A" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Mobile device */}
      <rect x="380" y="180" width="60" height="100" rx="8" fill="#0B1F3A" fillOpacity="0.1" stroke="#0B1F3A" strokeWidth="1.5" />
      <rect x="388" y="195" width="44" height="60" rx="4" fill="#FF8C1A" fillOpacity="0.2" />
      {/* Cloud */}
      <ellipse cx="150" cy="150" rx="50" ry="30" fill="#0B1F3A" fillOpacity="0.08" stroke="#0B1F3A" strokeWidth="1.5" />
      <ellipse cx="180" cy="140" rx="35" ry="25" fill="#0B1F3A" fillOpacity="0.08" stroke="#0B1F3A" strokeWidth="1.5" />
      {/* Code snippet */}
      <rect x="80" y="80" width="140" height="80" rx="8" fill="#0B1F3A" fillOpacity="0.06" stroke="#0B1F3A" strokeWidth="1" />
      <rect x="95" y="100" width="80" height="6" rx="3" fill="#FF8C1A" fillOpacity="0.5" />
      <rect x="95" y="115" width="100" height="6" rx="3" fill="#0B1F3A" fillOpacity="0.2" />
      <rect x="95" y="130" width="60" height="6" rx="3" fill="#0B1F3A" fillOpacity="0.2" />
      {/* Accent dots */}
      <circle cx="480" cy="100" r="6" fill="#FF8C1A" fillOpacity="0.6" />
      <circle cx="520" cy="140" r="4" fill="#FF8C1A" fillOpacity="0.4" />
      <circle cx="60" cy="200" r="5" fill="#FF8C1A" fillOpacity="0.5" />
    </svg>
  );
}
