import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finit Solutions | AI systemen die 24/7 voor je werken',
  description: 'Finit helpt KMO\'s de stap richting AI te zetten — van grondige analyse tot krachtige systemen die écht tijd besparen.',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout doesn't render Navbar/Footer since AIDesignLanding has its own
  return <>{children}</>;
}
