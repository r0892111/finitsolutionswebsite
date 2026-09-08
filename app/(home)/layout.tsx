import { bricolage, schibsted } from '@/lib/fonts';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Geen Navbar/Footer van de rest van de site: de homepage brengt zijn eigen mee.
  return <div className={`${schibsted.variable} ${bricolage.variable} hp`}>{children}</div>;
}
