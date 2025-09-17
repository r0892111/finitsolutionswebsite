// app/page.tsx
import { redirect } from 'next/navigation';
export default function Root() {
  redirect('/en/'); // je gebruikt trailingSlash: true
}
