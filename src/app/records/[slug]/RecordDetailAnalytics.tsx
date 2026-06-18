'use client';

import { useEffect, useRef } from 'react';
import type { Record } from '@/data/records';
import { usePageTracking, useRudderAnalytics, trackRecordViewed } from '@/lib/analytics';

interface RecordDetailAnalyticsProps {
  record: Record;
}

export function RecordDetailAnalytics({
  record,
}: RecordDetailAnalyticsProps): null {
  const analytics = useRudderAnalytics();
  const hasFired = useRef(false);

  usePageTracking('Record Detail', {
    record_id: record.id,
    record_title: record.title,
    artist: record.artist,
  });

  useEffect(() => {
    if (!analytics || hasFired.current) return;
    hasFired.current = true;
    trackRecordViewed(analytics, {
      record_id: record.id,
      title: record.title,
      artist: record.artist,
      label: record.label,
      genre: record.genre,
      format: record.format,
      price_usd: record.priceUsd,
      release_year: record.releaseYear,
      in_stock: record.inStock,
    });
  }, [analytics, record]);

  return null;
}
