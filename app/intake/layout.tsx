import type { Metadata } from 'next';
import * as React from 'react';

import IntakeBodyClass from './body-class';

/**
 * Intake-only layout. Strips the public site's nav + footer + cookie banner
 * because this page is a focused, hidden-slug conversational flow.
 *
 * The root layout ([app/layout.tsx](../layout.tsx)) still renders, so global
 * providers (auth, consent, language) wrap us. We override `<main>`'s look by
 * giving this segment its own backdrop and adding a body class via the
 * client component [body-class.tsx](./body-class.tsx) so the public navbar
 * and footer hide.
 */

export const metadata: Metadata = {
  title: 'Finit OS — intake',
  description: 'Een korte conversational intake, ongeveer 20-25 minuten.',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body.intake-mode nav,
        body.intake-mode footer,
        body.intake-mode [data-cookie-banner] { display: none !important; }
        /* Lock the body so the fixed-viewport grid in OnboardingChat is the
           only scroller. Stops the page itself from growing as messages
           accumulate. */
        body.intake-mode { overflow: hidden !important; }
        html.intake-mode-html { overflow: hidden !important; }
        @keyframes intake-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: intake-fade-in 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
      <IntakeBodyClass />
      {children}
    </>
  );
}
