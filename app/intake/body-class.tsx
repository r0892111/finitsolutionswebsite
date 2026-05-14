'use client';

/**
 * Adds `intake-mode` to <body> while the intake layout is mounted so the
 * public site's nav, footer, and cookie banner hide via global CSS rules
 * defined in [layout.tsx](./layout.tsx).
 */

import * as React from 'react';

export default function IntakeBodyClass() {
  React.useEffect(() => {
    document.body.classList.add('intake-mode');
    return () => document.body.classList.remove('intake-mode');
  }, []);
  return null;
}
