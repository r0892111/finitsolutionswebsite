import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finit Solutions | Innovatieve Bedrijfsautomatisering',
  description: 'Finit Solutions helpt bedrijven groeien met slimme automatisering, software op maat en innovatieve SaaS-oplossingen. Ontdek hoe wij uw bedrijfsprocessen kunnen optimaliseren.',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout doesn't render Navbar/Footer since AIDesignLanding has its own
  return <>{children}</>;
}
