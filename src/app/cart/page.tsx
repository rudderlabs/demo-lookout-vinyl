'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/context';

export default function CartPage(): React.JSX.Element {
  const { items, subtotal, removeRecord } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-serif text-3xl text-stone-100">Your cart is empty</h1>
        <p className="text-stone-400 mt-2">
          Nothing here yet. The catalogue is the place to start.
        </p>
        <Link
          href="/records"
          className="inline-block mt-6 px-5 py-2.5 bg-amber-200/90 text-stone-950 text-sm font-medium rounded hover:bg-amber-200 transition"
        >
          Browse records &rarr;
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-serif text-4xl text-stone-100">Your cart</h1>
      <p className="text-stone-400 mt-1">
        {items.length} {items.length === 1 ? 'record' : 'records'}.
      </p>

      <div className="mt-8 border-t border-white/10">
        {items.map((item) => (
          <div
            key={item.recordId}
            className="flex items-center justify-between py-5 border-b border-white/10"
          >
            <div>
              <div className="text-stone-100">{item.title}</div>
              <div className="text-sm text-stone-400 mt-0.5">{item.artist}</div>
              <div className="text-xs text-stone-500 mt-1">
                Qty {item.quantity} &middot; ${item.priceUsd} each
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-stone-100 tabular-nums">
                ${(item.priceUsd * item.quantity).toFixed(2)}
              </div>
              <button
                type="button"
                onClick={() => removeRecord(item.recordId)}
                className="text-xs text-stone-500 hover:text-amber-200 transition"
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-baseline justify-between">
        <div className="text-xs uppercase tracking-wider text-stone-500">
          Subtotal
        </div>
        <div className="font-serif text-2xl text-stone-100 tabular-nums">
          ${subtotal.toFixed(2)}
        </div>
      </div>
      <div className="text-xs text-stone-500 text-right mt-1">
        Shipping calculated at checkout
      </div>

      <Link
        href="/checkout"
        className="block w-full mt-8 py-3 bg-amber-200/90 text-stone-950 text-center font-medium rounded hover:bg-amber-200 transition"
      >
        Checkout &rarr;
      </Link>
    </>
  );
}
