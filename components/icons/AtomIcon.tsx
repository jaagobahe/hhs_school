import React from 'react';

const AtomIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(-45 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export default AtomIcon;
