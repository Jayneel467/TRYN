export function FoundersIllustration() {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="500" height="400" fill="#F4F5F7" rx="24" className="dark:fill-navy-light" />
      {/* Rocket / vision */}
      <path d="M250 80 L270 180 L250 200 L230 180 Z" fill="#FF8C1A" fillOpacity="0.8" />
      <path d="M250 200 L250 280" stroke="#0B1F3A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="250" cy="70" r="15" fill="#FF8C1A" fillOpacity="0.3" stroke="#FF8C1A" strokeWidth="2" />
      {/* Team nodes */}
      <circle cx="120" cy="280" r="30" fill="#0B1F3A" fillOpacity="0.1" stroke="#0B1F3A" strokeWidth="2" />
      <circle cx="380" cy="280" r="30" fill="#0B1F3A" fillOpacity="0.1" stroke="#0B1F3A" strokeWidth="2" />
      <circle cx="250" cy="320" r="35" fill="#0B1F3A" fillOpacity="0.15" stroke="#FF8C1A" strokeWidth="2" />
      {/* Connection lines */}
      <line x1="150" y1="270" x2="220" y2="210" stroke="#FF8C1A" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="350" y1="270" x2="280" y2="210" stroke="#FF8C1A" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="150" y1="290" x2="215" y2="310" stroke="#0B1F3A" strokeWidth="1.5" strokeOpacity="0.3" />
      <line x1="350" y1="290" x2="285" y2="310" stroke="#0B1F3A" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Icons in nodes */}
      <text x="120" y="285" textAnchor="middle" fill="#0B1F3A" fontSize="14" fontWeight="bold">UX</text>
      <text x="380" y="285" textAnchor="middle" fill="#0B1F3A" fontSize="14" fontWeight="bold">AI</text>
      <text x="250" y="325" textAnchor="middle" fill="#FF8C1A" fontSize="14" fontWeight="bold">ENG</text>
    </svg>
  );
}
