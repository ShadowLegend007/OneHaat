import React from 'react';
import { AnimatedContent } from './AnimatedContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  stagger?: number;
}

export const Reveal: React.FC<RevealProps> = React.memo(({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.75,
  distance = 30,
  className = '',
  threshold = 0.1,
  once = true,
  stagger = 0,
}) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const isHorizontal = direction === 'left' || direction === 'right';
  const isReverse = direction === 'down' || direction === 'right';
  const actualDistance = direction === 'none' ? 0 : distance;

  return (
    <AnimatedContent
      distance={actualDistance}
      direction={isHorizontal ? 'horizontal' : 'vertical'}
      reverse={isReverse}
      duration={duration}
      delay={delay}
      threshold={threshold}
      once={once}
      stagger={stagger}
      className={className}
      ease="power3.out"
    >
      {children}
    </AnimatedContent>
  );
});

export default Reveal;
