import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Maatwerk Proces | Finit Solutions - Van Idee tot Impact',
  description: 'Ontdek ons bewezen maatwerk proces: van probleem identificatie tot continue verbetering. Een interactief verhaal van hoe wij samen met u van uitdaging naar oplossing gaan.',
  keywords: 'maatwerk, software ontwikkeling, proces, automatisering, digitale transformatie, Finit Solutions',
  openGraph: {
    title: 'Maatwerk Proces | Finit Solutions',
    description: 'Van idee tot impact: ontdek ons bewezen maatwerk proces voor digitale transformatie.',
    type: 'website',
    images: [
      {
        url: '/logo-blue-yellow.png',
        width: 1200,
        height: 630,
        alt: 'Finit Solutions Diensten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maatwerk Proces | Finit Solutions',
    description: 'Van idee tot impact: ontdek ons bewezen maatwerk proces.',
    images: ['/logo-blue-yellow.png'],
  },
};

export default function MaatwerkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}