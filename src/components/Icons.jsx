// Lightweight inline SVG icon set — keeps the UI consistent across
// operating systems instead of relying on emoji rendering.

export const IconYouTube = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M22 12s0-3.2-.4-4.7c-.24-.86-.9-1.53-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.53c-.86.24-1.52.9-1.76 1.77C2 8.8 2 12 2 12s0 3.2.4 4.7c.24.87.9 1.53 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.53c.86-.24 1.52-.9 1.76-1.77C22 15.2 22 12 22 12Z"
      fill="#FF0000"
    />
    <path d="M10 9.5v5l4.5-2.5-4.5-2.5Z" fill="#fff" />
  </svg>
);

export const IconInstagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <defs>
      <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0">
        <stop offset="0" stopColor="#FFDD55" />
        <stop offset="0.5" stopColor="#E1306C" />
        <stop offset="1" stopColor="#5851DB" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
    <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.8" />
    <circle cx="17.3" cy="6.7" r="1.1" fill="#fff" />
  </svg>
);

export const IconFacebook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10" fill="#1877F2" />
    <path
      d="M13.6 21v-6.6h2.2l.4-2.6h-2.6v-1.6c0-.7.2-1.2 1.3-1.2h1.4V6.6c-.7-.08-1.4-.12-2.1-.12-2.1 0-3.6 1.3-3.6 3.6v2.1H8.4v2.6h1.8V21"
      fill="#fff"
    />
  </svg>
);

export const IconX = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#0f1419" />
    <path d="M7 7l10 10M17 7 7 17" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconTikTok = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#000" />
    <path
      d="M14.5 6.5c.3 1.5 1.3 2.5 3 2.7v2.1c-1.1 0-2.1-.3-3-.9v4.3a3.7 3.7 0 1 1-3.1-3.65v2.1a1.6 1.6 0 1 0 1.1 1.55V6.5h2Z"
      fill="#25F4EE"
    />
    <path
      d="M14 6.5c.3 1.5 1.3 2.5 3 2.7v1.1c-1.1 0-2.1-.3-3-.9v4.3a3.7 3.7 0 1 1-2.9-3.62v1.98a1.6 1.6 0 1 0 .9 1.44V6.5h2Z"
      fill="#FE2C55"
      opacity="0.85"
    />
  </svg>
);

export const IconLink = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M9.5 14.5l5-5M8 16l-1.5 1.5a3 3 0 0 1-4.24-4.24L4 11.5m12 1 1.74-1.74a3 3 0 0 0-4.24-4.24L12 8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconClipboard = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="6" y="4" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const IconDownload = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconZap = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const IconGlobe = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const IconLock = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const IconMusic = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17" cy="15" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 17V5l10-2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconFilm = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconUser = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
