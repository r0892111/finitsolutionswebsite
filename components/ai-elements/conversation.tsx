'use client';

/**
 * Conversation — sticky-bottom scroll container for chat messages.
 *
 * Adapted from Vercel AI Elements (https://elements.ai-sdk.dev/) and trimmed
 * to drop the `ai` SDK dependency (we don't use UIMessage in this project)
 * and the markdown-export helper.
 */

import { ArrowDown } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useCallback } from 'react';
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';

import { cn } from '@/lib/utils';

export type ConversationProps = ComponentProps<typeof StickToBottom>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
  <StickToBottom
    className={cn('relative flex-1 overflow-y-hidden', className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<typeof StickToBottom.Content>;

export const ConversationContent = ({ className, ...props }: ConversationContentProps) => (
  <StickToBottom.Content
    className={cn('flex flex-col gap-4 px-4 py-6 md:px-6 md:py-8', className)}
    {...props}
  />
);

export type ConversationScrollButtonProps = ComponentProps<'button'>;

export const ConversationScrollButton = ({
  className,
  ...props
}: ConversationScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  if (isAtBottom) return null;

  return (
    <button
      aria-label="Scroll to latest"
      className={cn(
        'absolute bottom-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[#C9D0E2] bg-[#FFFEFA] px-3 py-1.5 text-[0.75rem] font-medium text-[#1A2D63] shadow-[0_4px_12px_-4px_rgba(20,30,60,0.18)] transition-colors hover:bg-[#F2F4FA]',
        className,
      )}
      onClick={handleScrollToBottom}
      type="button"
      {...props}
    >
      <ArrowDown className="h-3 w-3" />
      <span>Latest</span>
    </button>
  );
};
