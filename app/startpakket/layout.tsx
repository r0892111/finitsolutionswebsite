import * as React from 'react';

// Startpakket van de AI-workshop (QR-code op de lezing, ook voor socials). Geen navbar of footer.
export default function StartpakketLayout({ children }: { children: React.ReactNode }) {
  return <div className="hp">{children}</div>;
}
