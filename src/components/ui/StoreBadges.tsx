import React from 'react';

interface BadgeProps {
  className?: string;
}

export const AppStoreBadge: React.FC<BadgeProps> = ({ className = 'h-10 sm:h-11 w-auto' }) => (
  <img
    src="/Apple-Store.svg?v=20261104_v2"
    alt="Download on the App Store"
    width={1567}
    height={464}
    className={`object-contain select-none aspect-[1567/464] ${className}`}
    loading="lazy"
  />
);

export const GooglePlayBadge: React.FC<BadgeProps> = ({ className = 'h-10 sm:h-11 w-auto' }) => (
  <img
    src="/Google-play.png?v=20261104"
    alt="Get it on Google Play"
    width={1567}
    height={464}
    className={`object-contain select-none aspect-[1567/464] ${className}`}
    loading="lazy"
  />
);
