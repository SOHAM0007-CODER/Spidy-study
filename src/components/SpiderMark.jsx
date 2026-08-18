import React from 'react';

export default function SpiderMark({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M16 3v26M3 16h26M6 6l20 20M26 6L6 26" />
      <circle cx="16" cy="16" r="4.5" fill="currentColor" stroke="none" />
      <path d="M16 8.5 22 16l-6 7.5L10 16z" />
    </svg>
  );
}
