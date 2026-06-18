'use client';

import { useEffect, useRef } from 'react';
import type { Record } from '@/data/records';
import { usePageTracking, useRudderAnalytics, trackRecordListViewed } from '@/lib/analytics';

interface RecordsAnalyticsProps {
  records: Record[];
}

export function RecordsAnalytics({ records }: RecordsAnalyticsProps): null {
  const analytics = useRudderAnalytics();
  const hasFired = useRef(false);

  usePageTracking('Records Catalogue');

  useEffect(() => {
    if (!analytics || hasFired.current) return;
    hasFired.current = true;
    trackRecordListViewed(analytics, {
      records: records.map((r) => ({
        record_id: r.id,
        title: r.title,
        artist: r.artist,
        label: r.label,
        genre: r.genre,
        format: r.format,
        price_usd: r.priceUsd,
        release_year: r.releaseYear,
        in_stock: r.inStock,
      })),
    });
  }, [analytics, records]);

  return null;
}
