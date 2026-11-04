import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  containerClassName?: string;
  imageClassName?: string;
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
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: priority ? 1 : 0, scale: priority ? 1 : 0.98 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 0.98,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`w-full h-full select-none ${imageClassName}`}
      />
      {children}
    </div>
  );
};
