'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/context';

export function Header(): React.JSX.Element {
  const { itemCount } = useCart();
  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-stone-100 tracking-tight">
          Wax &amp; Wane
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/records" className="text-stone-300 hover:text-amber-200 transition">
            Records
          </Link>
          <Link href="/cart" className="text-stone-300 hover:text-amber-200 transition flex items-center gap-1.5">
            Cart
            {itemCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-medium rounded-full bg-amber-200/90 text-stone-950">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
