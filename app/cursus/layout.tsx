import * as React from 'react';

// De landingspagina van de cursus: zoals de hub geen navbar of footer van de site.
export default function CursusLayout({ children }: { children: React.ReactNode }) {
  return <div className="hp">{children}</div>;
}
