'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart/context';
import { trackRecordAddedToCart } from '@/lib/analytics';
import type { Record } from '@/data/records';

interface AddToCartButtonProps {
  record: Record;
}

export function AddToCartButton({
  record,
}: AddToCartButtonProps): React.JSX.Element {
  const { addRecord } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick(): void {
    addRecord(record);
    trackRecordAddedToCart({
      record_id: record.id,
      record_title: record.title,
      artist: record.artist,
      price_usd: record.priceUsd,
      currency: 'USD',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full py-3 bg-amber-200/90 text-stone-950 font-medium rounded hover:bg-amber-200 transition disabled:opacity-50"
      disabled={added}
    >
      {added ? 'Added to cart ✓' : 'Add to cart'}
    </button>
  );
}
