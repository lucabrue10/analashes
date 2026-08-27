export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8c8ff" />
          <stop offset="100%" stopColor="#7844cf" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#logo-gradient)" strokeWidth="1" opacity="0.45" />
      <path d="M12 39 Q32 17 52 39" fill="none" stroke="url(#logo-gradient)" strokeWidth="2.4" strokeLinecap="round" />
      <g stroke="url(#logo-gradient)" strokeWidth="1.9" strokeLinecap="round">
        <path d="M15 36 L10 27" />
        <path d="M22 30 L18.5 20" />
        <path d="M29.5 26.5 L28.5 16" />
        <path d="M37 26.5 L39 16" />
        <path d="M44 30 L48 20" />
        <path d="M50 36 L55 27" />
      </g>
      <circle cx="32" cy="39" r="5.4" fill="url(#logo-gradient)" />
    </svg>
  );
}
