# AGENTS.md - Finit Solutions Website

This document provides guidance for AI coding agents working on this Next.js 14 website for Finit Solutions, a Belgian AI/automation company.

## Project Overview

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Output**: Static export (SSG)
- **i18n**: Dutch (nl) and English (en) via React Context

## Build/Dev Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build with static export
npm run clean    # Remove .next build cache
```

**Note**: No test framework is configured. No lint/format scripts exist in package.json, but ESLint runs during build.

## Project Structure

```
app/                    # Next.js App Router pages
  (home)/              # Homepage route group
  (main)/              # Main pages with navbar/footer layout
  api/                 # API routes (limited in static export)
components/            # React components
  ui/                  # shadcn/ui primitives (do not modify directly)
  [feature].tsx        # Feature-specific components
contexts/              # React Context providers (language, consent)
hooks/                 # Custom React hooks
lib/                   # Utilities and data files
  utils.ts             # cn() helper for className merging
types/                 # TypeScript type definitions
public/                # Static assets
supabase/functions/    # Supabase Edge Functions (Deno runtime)
```

## Code Style Guidelines

### TypeScript

- Strict mode is enabled - all code must be properly typed
- Use interfaces for object shapes, types for unions/primitives
- Path alias: use `@/` for imports (maps to project root)
- Avoid `any` - use `unknown` with type guards when needed

```typescript
// Good
import { cn } from '@/lib/utils';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

// Bad
import { cn } from '../../lib/utils';
const props: any = {};
```

### React Components

- **Client components**: Add `"use client"` directive at top of file when using hooks (useState, useEffect, etc.)
- **Server components**: Default in App Router - no directive needed
- Use `React.forwardRef` for components that accept refs
- Set `displayName` for forwardRef components

```typescript
"use client";

import React from 'react';

const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("base-class", className)} {...props} />;
  }
);
MyComponent.displayName = 'MyComponent';
```

### Styling

- Use Tailwind CSS classes exclusively
- Use `cn()` from `@/lib/utils` for conditional/merged classes
- Use CSS variables for theming (defined in `globals.css`)
- shadcn/ui components use class-variance-authority (CVA) for variants

**Brand Colors** (defined as CSS variables):
- Primary: Navy blue (`--primary: 217 54% 31%`)
- Use semantic color names: `bg-primary`, `text-foreground`, `border-input`

**Custom Typography Classes** (in globals.css):
- `.finit-h1`, `.finit-h2`, `.finit-body` for brand typography
- `.font-montserrat` for primary font

```typescript
// Good
<div className={cn("bg-primary text-primary-foreground", isActive && "ring-2")}>

// Bad - don't use inline styles or hardcoded colors
<div style={{ backgroundColor: '#1C2C55' }}>
```

### Naming Conventions

- **Components**: PascalCase (`CookieBanner.tsx`, `HeroSection.tsx`)
- **Hooks**: camelCase with `use` prefix (`useProcessScroll.ts`)
- **Utilities**: camelCase (`utils.ts`, `schema.ts`)
- **Route groups**: Parentheses (`(main)`, `(home)`)

### Imports Order

1. React and Next.js imports
2. Third-party libraries
3. Internal components (`@/components/`)
4. Internal utilities (`@/lib/`, `@/hooks/`)
5. Types (`@/types/`)

```typescript
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Language } from '@/contexts/language-context';
```

### Internationalization

- Use `useLanguage()` hook from `@/contexts/language-context`
- Access translations via `t('key.path')` function
- Add new translations to both `nl` and `en` objects in `language-context.tsx`

```typescript
const { t, language } = useLanguage();
return <h1>{t('hero.title')}</h1>;
```

### Form Handling

- Use `react-hook-form` with `@hookform/resolvers`
- Define Zod schemas in `lib/schema.ts`
- Use shadcn/ui form components

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/schema';
```

### Animation

- **Framer Motion**: Preferred for React component animations
- **GSAP**: Available for complex timeline animations
- **CSS**: Simple transitions via Tailwind or keyframes in globals.css

### Icons

- Use **Lucide React** exclusively (`lucide-react`)
- Do not install additional icon packages

```typescript
import { ArrowRight, Check } from 'lucide-react';
```

## shadcn/ui Components

Located in `components/ui/`. These are pre-configured:
- Do not modify the base component files directly
- Extend via composition or wrapper components
- Use the existing variant system

## Error Handling

- Avoid hydration mismatches - ensure server/client render consistency
- Use `suppressHydrationWarning` sparingly and only when necessary
- Handle loading states for client-side data

## Static Export Considerations

This site uses `output: 'export'` for static generation:
- No server-side features (API routes have limitations)
- Images must use `unoptimized: true`
- Dynamic routes need `generateStaticParams()`
- Use `trailingSlash: true` for proper routing

## Environment Variables

- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` - Contact form API

## Key Dependencies

| Purpose | Package |
|---------|---------|
| UI Components | shadcn/ui (Radix primitives) |
| Icons | lucide-react |
| Animation | framer-motion, gsap |
| Forms | react-hook-form, zod |
| Styling | tailwindcss, class-variance-authority |

## Common Patterns

### Client Component with i18n
```typescript
"use client";

import { useLanguage } from '@/contexts/language-context';

export function MyComponent() {
  const { t } = useLanguage();
  return <p>{t('my.translation.key')}</p>;
}
```

### Conditional Styling
```typescript
import { cn } from '@/lib/utils';

<button className={cn(
  "px-4 py-2 rounded-md",
  variant === "primary" && "bg-primary text-white",
  disabled && "opacity-50 cursor-not-allowed"
)} />
```

## Do Not

- Install additional UI/icon packages without explicit request
- Use inline styles or hardcoded color values
- Create components with hydration mismatches
- Modify shadcn/ui base components directly
- Use `any` type without justification
- Forget `"use client"` directive for hooks

Dont need to always run build if you dont think its necessary, your choice but where possible, avoid it. 


## MCP Tools

Always use Context7 MCP when you need library/API documentation, code generation, setup or configuration steps without the user having to explicitly ask.
