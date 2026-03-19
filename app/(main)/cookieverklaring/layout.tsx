import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cookieverklaring | Finit Solutions',
  description: 'Lees hoe Finit Solutions cookies gebruikt om je ervaring te verbeteren. Overzicht van alle cookies, hun doel en hoe je je voorkeuren beheert.',
};

export default function CookieverklaringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
