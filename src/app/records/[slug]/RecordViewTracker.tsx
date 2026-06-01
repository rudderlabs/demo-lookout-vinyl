'use client';

import { useEffect, useRef } from 'react';
import { trackRecordViewed } from '@/lib/analytics';
import type { Record } from '@/data/records';

interface RecordViewTrackerProps {
  record: Pick<
    Record,
    'id' | 'slug' | 'title' | 'artist' | 'genre' | 'priceUsd' | 'inStock' | 'releaseYear'
  >;
}

export function RecordViewTracker({
  record,
}: RecordViewTrackerProps): null {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackRecordViewed({
      record_id: record.id,
      record_slug: record.slug,
      record_title: record.title,
      artist: record.artist,
      genre: record.genre,
      price_usd: record.priceUsd,
      in_stock: record.inStock,
      release_year: record.releaseYear,
    });
  }, [record]);

  return null;
}
