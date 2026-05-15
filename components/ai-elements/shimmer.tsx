'use client';

/**
 * Shimmer — sweep-of-light text animation, à la Claude's "Spelunking…" /
 * GPT's "Thinking…" pulse. Adapted from Vercel AI Elements to use the
 * already-installed `framer-motion` (the project hasn't migrated to the
 * `motion` fork yet) and the Finit marine palette.
 */

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ElementType } from 'react';
import { memo, useMemo } from 'react';

import { cn } from '@/lib/utils';

export interface ShimmerProps {
  children: string;
  as?: ElementType;
  className?: string;
  /** Sweep duration in seconds. */
  duration?: number;
  /** Per-character width of the highlight band, in px. */
  spread?: number;
  /** Base (resting) text color, override per-context. */
  baseColor?: string;
  /** Color of the moving highlight. */
  highlightColor?: string;
}

const ShimmerComponent = ({
  children,
  as = 'span',
  className,
  duration = 1.6,
  spread = 2,
  baseColor = '#697597',
  // Matches page bg; the sweep "wipes" through the muted text instead of
  // tinting it. Same trick as the upstream AI Elements component.
  highlightColor = '#FDFBF7',
}: ShimmerProps) => {
  const reduced = useReducedMotion();

  const dynamicSpread = useMemo(
    () => (children?.length ?? 0) * spread,
    [children, spread],
  );

  const Tag = motion[as as 'span'] as typeof motion.span;

  if (reduced) {
    const Static = as as ElementType;
    return (
      <Static className={cn('inline-block', className)} style={{ color: baseColor }}>
        {children}
      </Static>
    );
  }

  return (
    <Tag
      animate={{ backgroundPosition: '0% center' }}
      className={cn(
        'relative inline-block bg-clip-text text-transparent',
        'bg-[length:250%_100%,auto] [background-repeat:no-repeat,padding-box]',
        className,
      )}
      initial={{ backgroundPosition: '100% center' }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          '--highlight': highlightColor,
          '--base': baseColor,
          backgroundImage:
            'linear-gradient(90deg, transparent calc(50% - var(--spread)), var(--highlight), transparent calc(50% + var(--spread))), linear-gradient(var(--base), var(--base))',
        } as CSSProperties
      }
      transition={{
        duration,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {children}
    </Tag>
  );
};

export const Shimmer = memo(ShimmerComponent);
