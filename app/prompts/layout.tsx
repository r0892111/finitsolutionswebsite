import * as React from 'react';

// Promptpagina's, gelinkt vanaf de resource hub. Geen navbar of footer, net als de hub.
export default function PromptsLayout({ children }: { children: React.ReactNode }) {
  return <div className="hp">{children}</div>;
}
