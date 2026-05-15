'use client';

/**
 * Message — chat-bubble primitive in the AI Elements shape, themed to the
 * Finit marine palette. Trimmed: no streamdown/markdown, no branch nav,
 * no toolbar actions — those parts of AI Elements aren't used here.
 */

import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type MessageRole = 'user' | 'assistant' | 'system';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: MessageRole;
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      'group flex w-full max-w-full flex-col gap-2',
      from === 'user' ? 'is-user items-end' : 'is-assistant items-start',
      className,
    )}
    data-from={from}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({ className, ...props }: MessageContentProps) => (
  <div
    className={cn(
      'min-w-0 max-w-[90%] overflow-hidden whitespace-pre-wrap text-[0.9375rem] leading-relaxed',
      'group-data-[from=assistant]:rounded-2xl group-data-[from=assistant]:rounded-tl-sm',
      'group-data-[from=assistant]:border group-data-[from=assistant]:border-[#E8E6DC]',
      'group-data-[from=assistant]:bg-[#FFFEFA] group-data-[from=assistant]:px-4 group-data-[from=assistant]:py-3',
      'group-data-[from=assistant]:text-[#2A2620]',
      'group-data-[from=assistant]:shadow-[0_1px_2px_rgba(60,50,30,0.04),0_8px_18px_-10px_rgba(60,50,30,0.08)]',
      'group-data-[from=user]:rounded-2xl group-data-[from=user]:rounded-tr-sm',
      'group-data-[from=user]:bg-[#1A2D63] group-data-[from=user]:px-4 group-data-[from=user]:py-3',
      'group-data-[from=user]:text-[#FDFBF7]',
      'group-data-[from=user]:shadow-[0_2px_8px_-2px_rgba(20,30,60,0.25)]',
      'group-data-[from=system]:w-full group-data-[from=system]:max-w-full',
      'group-data-[from=system]:rounded-lg group-data-[from=system]:border group-data-[from=system]:border-[#E8DCC9]',
      'group-data-[from=system]:bg-[#FAF5EC] group-data-[from=system]:px-4 group-data-[from=system]:py-2',
      'group-data-[from=system]:text-center group-data-[from=system]:text-[0.8125rem] group-data-[from=system]:text-[#74532A]',
      // No browser-driven scroll re-anchoring while text streams in.
      'overflow-anchor-none [overflow-anchor:none]',
      className,
    )}
    {...props}
  />
);
