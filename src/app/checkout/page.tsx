'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/cart/context';
import {
  usePageTracking,
  useRudderAnalytics,
  trackCheckoutStarted,
  trackOrderCompleted,
} from '@/lib/analytics';
import { generateId } from '@/lib/utils';

const SHIPPING_USD = 6;

export default function CheckoutPage(): React.JSX.Element {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const analytics = useRudderAnalytics();
  const checkoutStartedFired = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderId] = useState(() => generateId());

  usePageTracking('Checkout');

  const total = subtotal + SHIPPING_USD;

  useEffect(() => {
    if (!analytics || items.length === 0 || checkoutStartedFired.current) return;
    checkoutStartedFired.current = true;
    trackCheckoutStarted(analytics, {
      order_id: orderId,
      subtotal_usd: subtotal,
      shipping_usd: SHIPPING_USD,
      total_usd: total,
      items: items.map((i) => ({
        record_id: i.recordId,
        title: i.title,
        artist: i.artist,
        price_usd: i.priceUsd,
        quantity: i.quantity,
      })),
    });
  }, [analytics, items, subtotal, total, orderId]);

  if (items.length === 0 && !submitting) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-serif text-3xl text-stone-100">Nothing to check out</h1>
        <Link
          href="/records"
          className="inline-block mt-6 px-5 py-2.5 bg-amber-200/90 text-stone-950 text-sm font-medium rounded hover:bg-amber-200 transition"
        >
          Browse records &rarr;
        </Link>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setSubmitting(true);
    if (analytics) {
      trackOrderCompleted(analytics, {
        order_id: orderId,
        subtotal_usd: subtotal,
        shipping_usd: SHIPPING_USD,
        total_usd: total,
        items: items.map((i) => ({
          record_id: i.recordId,
          title: i.title,
          artist: i.artist,
          price_usd: i.priceUsd,
          quantity: i.quantity,
        })),
      });
    }
    setTimeout(() => {
      clearCart();
      router.push('/');
    }, 600);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12">
      <div>
        <h1 className="font-serif text-4xl text-stone-100">Checkout</h1>
        <p className="text-stone-400 mt-1">
          Demo only &mdash; no real payment is processed.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-wider text-stone-500 mb-2">
              Shipping
            </legend>
            <input
              required
              placeholder="Full name"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
            />
            <input
              required
              placeholder="Address"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="City"
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
              />
              <input
                required
                placeholder="Postal code"
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-xs uppercase tracking-wider text-stone-500 mb-2">
              Card
            </legend>
            <input
              required
              inputMode="numeric"
              placeholder="Card number"
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="MM / YY"
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
              />
              <input
                required
                inputMode="numeric"
                placeholder="CVC"
                className="bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-200/50"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-amber-200/90 text-stone-950 font-medium rounded hover:bg-amber-200 transition disabled:opacity-50"
          >
            {submitting ? 'Placing order…' : `Place order · $${total.toFixed(2)}`}
          </button>
        </form>
      </div>

      <aside className="md:border-l md:border-white/10 md:pl-12">
        <div className="text-xs uppercase tracking-wider text-stone-500">
          Order
        </div>
        <div className="mt-3 space-y-3">
          {items.map((item) => (
            <div key={item.recordId} className="flex justify-between text-sm">
              <div className="text-stone-300">
                {item.title}
                <span className="text-stone-500"> &times; {item.quantity}</span>
              </div>
              <div className="text-stone-300 tabular-nums">
                ${(item.priceUsd * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-5 border-t border-white/10 space-y-2 text-sm">
          <div className="flex justify-between text-stone-400">
            <span>Subtotal</span>
            <span className="tabular-nums">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-stone-400">
            <span>Shipping</span>
            <span className="tabular-nums">${SHIPPING_USD.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-stone-100 font-medium pt-2 border-t border-white/5">
            <span>Total</span>
            <span className="tabular-nums">${total.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
