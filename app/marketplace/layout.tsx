import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'AI SaaS Marketplace | Finit Solutions - Plug & Play AI Oplossingen',
  description: 'Ontdek onze collectie van plug & play AI-oplossingen. Van Voice-to-CRM tot Smart Dashboards - klaar om direct te gebruiken zonder complexe implementatie.',
  keywords: 'AI SaaS, marketplace, plug and play, Voice-to-CRM, AI dashboard, chatbot, automatisering, Finit Solutions',
  openGraph: {
    title: 'AI SaaS Marketplace | Finit Solutions',
    description: 'Plug & play AI-oplossingen voor moderne bedrijven. Ontdek onze collectie van kant-en-klare AI tools.',
    type: 'website',
    images: [
      {
        url: '/Finit Logomark@4x.png',
        width: 1200,
        height: 630,
        alt: 'Finit Solutions Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SaaS Marketplace | Finit Solutions',
    description: 'Plug & play AI-oplossingen voor moderne bedrijven.',
    images: ['/Finit Logomark@4x.png'],
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}