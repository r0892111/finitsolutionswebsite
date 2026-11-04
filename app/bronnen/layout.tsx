import * as React from 'react';

// Bronnenpagina, gelinkt vanaf de resource hub. Geen navbar of footer, net als de hub.
export default function BronnenLayout({ children }: { children: React.ReactNode }) {
  return <div className="hp">{children}</div>;
}
