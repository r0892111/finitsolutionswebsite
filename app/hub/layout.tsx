import * as React from 'react';

// De resource hub: de link in bio op alle socials. Geen navbar of footer van de site.
export default function HubLayout({ children }: { children: React.ReactNode }) {
  return <div className="hp">{children}</div>;
}
