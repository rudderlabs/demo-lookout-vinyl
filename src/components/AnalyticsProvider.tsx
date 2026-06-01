'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRudderAnalytics, trackPageViewed } from '@/lib/analytics';
import type { RudderAnalytics } from '@rudderstack/analytics-js';

function getPageName(pathname: string): string {
  if (pathname === '/') return 'Home';
  if (pathname === '/records') return 'Catalogue';
  if (pathname.startsWith('/records/')) return 'Record Detail';
  if (pathname === '/cart') return 'Cart';
  if (pathname === '/checkout') return 'Checkout';
  return 'Page';
}

export function AnalyticsProvider(): null {
  const analytics: RudderAnalytics | null = useRudderAnalytics();
  const pathname = usePathname();
  const trackedPaths = useRef(new Set<string>());

  useEffect(() => {
    if (!analytics) return;
    if (trackedPaths.current.has(pathname)) return;
    trackedPaths.current.add(pathname);
    trackPageViewed({
      page_name: getPageName(pathname),
      page_path: pathname,
    });
  }, [analytics, pathname]);

  return null;
}
