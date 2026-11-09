import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export type WaterGlassVariant = 'emerald' | 'clear' | 'dark' | 'ghost';
export type WaterGlassSize = 'sm' | 'default' | 'lg' | 'icon' | 'none';

export interface WaterGlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: WaterGlassVariant;
  size?: WaterGlassSize;
  asChild?: boolean;
  className?: string;
  glow?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<WaterGlassVariant, { base: string; specular: string; shadow: string }> = {
  emerald: {
    base: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500/60 hover:border-emerald-400 font-bold',
    specular: 'from-white/40 via-white/10 to-transparent',
    shadow: 'shadow-md shadow-emerald-900/20 hover:shadow-xl hover:shadow-emerald-900/25',
  },
  clear: {
    base: 'bg-white/95 hover:bg-white text-slate-900 border-slate-300 hover:border-slate-400 font-bold',
    specular: 'from-white/50 via-white/15 to-transparent',
    shadow: 'shadow-sm shadow-slate-900/5 hover:shadow-md hover:shadow-slate-900/10',
  },
  dark: {
    base: 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700 hover:border-slate-600 font-bold',
    specular: 'from-white/30 via-white/5 to-transparent',
    shadow: 'shadow-md shadow-black/25 hover:shadow-xl hover:shadow-black/35',
  },
  ghost: {
    base: 'bg-white/60 hover:bg-white/80 text-slate-800 border-slate-300/80 hover:border-slate-400 font-semibold',
    specular: 'from-white/30 via-transparent to-transparent',
    shadow: 'shadow-2xs',
  },
};

const sizeStyles: Record<WaterGlassSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs font-semibold gap-1.5 rounded-full',
  default: 'px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold gap-2 rounded-full',
  lg: 'px-7 py-3.5 text-sm sm:text-base font-bold gap-2.5 rounded-full',
  icon: 'w-8 h-8 sm:w-9 sm:h-9 p-0 flex items-center justify-center rounded-full',
  none: '',
};

export const WaterGlassButton = React.forwardRef<HTMLButtonElement, WaterGlassButtonProps>(
  (
    {
      variant = 'emerald',
      size = 'default',
      asChild = false,
      className = '',
      glow = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const vStyle = variantStyles[variant] || variantStyles.emerald;
    const sStyle = sizeStyles[size] || sizeStyles.default;

    // Disabled state styling - High contrast, legible text, zero washout
    const disabledStyle = disabled
      ? 'cursor-not-allowed pointer-events-none bg-slate-100 text-slate-400 border-slate-300 shadow-none'
      : 'cursor-pointer active:scale-[0.97]';

    const glassClasses = [
      'group relative isolate overflow-hidden select-none',
      'inline-flex items-center justify-center text-center',
      'backdrop-blur-xl -webkit-backdrop-blur-xl',
      'border transition-all duration-300 ease-out',
      disabled ? disabledStyle : vStyle.base,
      sStyle,
      disabled ? '' : vStyle.shadow,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const innerContent = (
      <>
        {/* 1. Water Meniscus Specular Highlight (Curved Top Refraction) */}
        {!disabled && (
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-b ${vStyle.specular} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
          />
        )}

        {/* 2. Water Rim Refraction Ring (Double-edge light bend) */}
        {!disabled && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] pointer-events-none ring-1 ring-inset ring-white/40 group-hover:ring-white/60 transition-all duration-300"
            style={{
              boxShadow:
                variant === 'clear'
                  ? 'inset 0 1.5px 2px 0 rgba(255,255,255,0.85), inset 0 -1.5px 2px 0 rgba(0,0,0,0.06)'
                  : 'inset 0 1.5px 2px 0 rgba(255,255,255,0.45), inset 0 -1.5px 2px 0 rgba(0,0,0,0.15)',
            }}
          />
        )}

        {/* 3. Fluid Interactive Light Sheen on Hover */}
        {glow && !disabled && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        )}

        {/* 4. Button Content in high-contrast relative z-10 layer */}
        <span className={`relative z-10 inline-flex items-center justify-center gap-1.5 w-full h-full pointer-events-none ${disabled ? 'text-slate-400 font-bold' : ''}`}>
          {children}
        </span>
      </>
    );

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(
        child,
        {
          ...props,
          ref,
          className: `${glassClasses} ${child.props.className || ''}`.trim(),
        },
        innerContent
      );
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={glassClasses}
        {...props}
      >
        {innerContent}
      </motion.button>
    );
  }
);

WaterGlassButton.displayName = 'WaterGlassButton';

export interface WaterGlassLinkProps extends Omit<HTMLMotionProps<'a'>, 'children'> {
  variant?: WaterGlassVariant;
  size?: WaterGlassSize;
  className?: string;
  glow?: boolean;
  children?: React.ReactNode;
}

export const WaterGlassLink = React.forwardRef<HTMLAnchorElement, WaterGlassLinkProps>(
  (
    {
      variant = 'emerald',
      size = 'default',
      className = '',
      glow = true,
      children,
      ...props
    },
    ref
  ) => {
    const vStyle = variantStyles[variant] || variantStyles.emerald;
    const sStyle = sizeStyles[size] || sizeStyles.default;

    const glassClasses = [
      'group relative isolate overflow-hidden select-none',
      'inline-flex items-center justify-center text-center cursor-pointer',
      'backdrop-blur-xl -webkit-backdrop-blur-xl',
      'border transition-all duration-300 ease-out active:scale-[0.97]',
      vStyle.base,
      sStyle,
      vStyle.shadow,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <motion.a
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={glassClasses}
        {...props}
      >
        {/* 1. Water Meniscus Specular Highlight */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-b ${vStyle.specular} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* 2. Water Rim Refraction Ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] pointer-events-none ring-1 ring-inset ring-white/40 group-hover:ring-white/60 transition-all duration-300"
          style={{
            boxShadow:
              variant === 'clear'
                ? 'inset 0 1.5px 2px 0 rgba(255,255,255,0.85), inset 0 -1.5px 2px 0 rgba(0,0,0,0.06)'
                : 'inset 0 1.5px 2px 0 rgba(255,255,255,0.45), inset 0 -1.5px 2px 0 rgba(0,0,0,0.15)',
          }}
        />

        {/* 3. Fluid Light Sheen on Hover */}
        {glow && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        )}

        {/* 4. Content */}
        <span className="relative z-10 inline-flex items-center justify-center gap-1.5 w-full h-full pointer-events-none">
          {children}
        </span>
      </motion.a>
    );
  }
);

WaterGlassLink.displayName = 'WaterGlassLink';
