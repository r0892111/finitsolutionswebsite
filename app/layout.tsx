// app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat'
});

const generalSans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-general-sans',
  display: 'swap'
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${montserrat.variable} ${generalSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
