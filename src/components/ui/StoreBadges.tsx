import React from 'react';

interface BadgeProps {
  className?: string;
}

export const AppStoreBadge: React.FC<BadgeProps> = ({ className = 'h-10 sm:h-11 w-auto' }) => (
  <img
    src="/Apple-Store.png"
    alt="Download on the App Store"
    width={140}
    height={42}
    className={`object-contain select-none ${className}`}
    loading="lazy"
  />
);

export const GooglePlayBadge: React.FC<BadgeProps> = ({ className = 'h-10 sm:h-11 w-auto' }) => (
  <img
    src="/Google-play.png"
    alt="Get it on Google Play"
    width={140}
    height={42}
    className={`object-contain select-none ${className}`}
    loading="lazy"
  />
);
