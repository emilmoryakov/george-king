import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';
import RegisterServiceWorker from '@/components/RegisterServiceWorker';

export const metadata: Metadata = {
  title: 'George King',
  description: 'An AI chat app where the assistant happens to be a king.',
  icons: {
    icon: '/icon-192.png',
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'George King',
    statusBarStyle: 'black-translucent',
  },
};

// Everything renders per request — the sidebar reads the database, so pages
// must not be prerendered at build time.
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-zinc-900 font-sans text-zinc-100 antialiased">
        <RegisterServiceWorker />
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
