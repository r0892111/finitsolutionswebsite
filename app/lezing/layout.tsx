import type { Metadata } from 'next';
import * as React from 'react';

// Lezing Open Boek (27 okt 2026): handout, presentatie en sprekersscherm.
// Geen navbar of footer, en niet in Google.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function LezingLayout({ children }: { children: React.ReactNode }) {
  return <div className="hp">{children}</div>;
}
