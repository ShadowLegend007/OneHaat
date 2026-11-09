import React, { useState, useEffect, useRef } from 'react';
import { motion, TargetAndTransition, Transition } from 'framer-motion';

export interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  containerClassName?: string;
  imageClassName?: string;
  continuousAnimate?: TargetAndTransition;
  continuousTransition?: Transition;
  children?: React.ReactNode;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspectRatio,
  width,
  height,
  priority = false,
  containerClassName = '',
  imageClassName = '',
  continuousAnimate,
  continuousTransition,
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: priority ? 1 : 0, scale: priority ? 1 : 0.98 }}
        animate={
          continuousAnimate && isLoaded
            ? continuousAnimate
            : {
                opacity: isLoaded ? 1 : 0,
                scale: isLoaded ? 1 : 0.98,
              }
        }
        transition={
          continuousTransition && isLoaded
            ? continuousTransition
            : { duration: 0.4, ease: 'easeOut' }
        }
        className={`w-full h-full select-none ${imageClassName}`}
      />
      {children}
    </div>
  );
};
