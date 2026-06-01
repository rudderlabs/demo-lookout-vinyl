import type { Metadata } from 'next';
import { CartProvider } from '@/lib/cart/context';
import { Header } from '@/components/Header';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wax & Wane — Records',
  description: 'An independent record label and shop. New releases on vinyl.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AnalyticsProvider />
          <Header />
          <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
          <footer className="border-t border-white/10 mt-20">
            <div className="mx-auto max-w-5xl px-6 py-8 text-xs text-stone-500">
              Wax &amp; Wane Records &middot; an independent label
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
