import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import SessionProvider from '@/components/shared/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IntegraJobs',
  description: 'Encuentra tu próximo empleo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <SessionProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
