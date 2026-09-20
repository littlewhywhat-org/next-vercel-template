import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from '@/app/providers';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Next.js Vercel Template',
  description: 'Minimal template with Vercel CI/CD',
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
