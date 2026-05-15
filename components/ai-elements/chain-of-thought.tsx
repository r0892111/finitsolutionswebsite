'use client';

/**
 * ChainOfThought — collapsible "what I did internally" panel. Adapted
 * from Vercel AI Elements; uses the shadcn collapsible already in the
 * project, themed marine, and a simple uncontrolled-with-prop pattern
 * instead of pulling in @radix-ui/react-use-controllable-state.
 */

import { Brain, ChevronDown, Check } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface ChainCtx {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChainContext = createContext<ChainCtx | null>(null);

const useChain = () => {
  const ctx = useContext(ChainContext);
  if (!ctx) throw new Error('ChainOfThought.* must be inside <ChainOfThought>');
  return ctx;
};

export type ChainOfThoughtProps = ComponentProps<'div'> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ChainOfThought = memo(function ChainOfThought({
  className,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: ChainOfThoughtProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? !!open : internalOpen;

  const setIsOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const value = useMemo<ChainCtx>(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <ChainContext.Provider value={value}>
      <div
        className={cn(
          'w-full rounded-xl border border-[#E8E6DC] bg-[#FFFEFA]/60 px-3 py-2',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ChainContext.Provider>
  );
});

export type ChainOfThoughtHeaderProps = ComponentProps<typeof CollapsibleTrigger>;

export const ChainOfThoughtHeader = memo(function ChainOfThoughtHeader({
  className,
  children,
  ...props
}: ChainOfThoughtHeaderProps) {
  const { isOpen, setIsOpen } = useChain();
  return (
    <Collapsible onOpenChange={setIsOpen} open={isOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center gap-2 text-[0.75rem] font-medium text-[#697597] transition-colors hover:text-[#1A2D63]',
          className,
        )}
        {...props}
      >
        <Brain className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">{children ?? 'Chain of thought'}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform', isOpen ? 'rotate-180' : 'rotate-0')}
        />
      </CollapsibleTrigger>
    </Collapsible>
  );
});

export type ChainOfThoughtContentProps = ComponentProps<typeof CollapsibleContent>;

export const ChainOfThoughtContent = memo(function ChainOfThoughtContent({
  className,
  children,
  ...props
}: ChainOfThoughtContentProps) {
  const { isOpen } = useChain();
  return (
    <Collapsible open={isOpen}>
      <CollapsibleContent
        className={cn(
          'mt-2 space-y-1.5 overflow-hidden',
          'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
          className,
        )}
        {...props}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
});

export type ChainOfThoughtStepStatus = 'complete' | 'active' | 'pending';

export type ChainOfThoughtStepProps = ComponentProps<'div'> & {
  label: ReactNode;
  description?: ReactNode;
  status?: ChainOfThoughtStepStatus;
};

const statusColor: Record<ChainOfThoughtStepStatus, string> = {
  complete: 'text-[#1A2D63]',
  active: 'text-[#1A2D63]',
  pending: 'text-[#A29B92]',
};

export const ChainOfThoughtStep = memo(function ChainOfThoughtStep({
  className,
  label,
  description,
  status = 'complete',
  ...props
}: ChainOfThoughtStepProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 text-[0.8125rem] leading-snug',
        statusColor[status],
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full',
          status === 'complete'
            ? 'bg-[#1A2D63] text-[#FDFBF7]'
            : status === 'active'
              ? 'bg-[#FDFBF7] text-[#1A2D63] ring-2 ring-[#1A2D63]'
              : 'bg-[#F2EFE6] text-[#A29B92]',
        )}
        aria-hidden="true"
      >
        {status === 'complete' ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
      </span>
      <div className="min-w-0 flex-1">
        <div>{label}</div>
        {description ? (
          <div className="text-[0.75rem] text-[#76706A]">{description}</div>
        ) : null}
      </div>
    </div>
  );
});
