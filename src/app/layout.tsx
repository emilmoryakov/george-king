import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';

export const metadata: Metadata = {
  title: 'George King',
  description: 'An AI chat app where the assistant happens to be a king.',
};

// Everything renders per request — the sidebar reads the database, so pages
// must not be prerendered at build time.
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-zinc-900 font-sans text-zinc-100 antialiased">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
