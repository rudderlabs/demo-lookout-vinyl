'use client';

import { useEffect, useRef, useState } from 'react';
import type { RudderAnalytics } from '@rudderstack/analytics-js';

let analyticsInstance: RudderAnalytics | null = null;
let initPromise: Promise<void> | null = null;

export function getAnalytics(): RudderAnalytics | null {
  return analyticsInstance;
}

export function useRudderAnalytics(): RudderAnalytics | null {
  const [analytics, setAnalytics] = useState<RudderAnalytics | null>(
    analyticsInstance,
  );
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const writeKey = process.env.NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY;
    const dataplaneUrl = process.env.NEXT_PUBLIC_RUDDERSTACK_DATAPLANE_URL;

    if (!writeKey || !dataplaneUrl) {
      console.warn('[analytics] Missing NEXT_PUBLIC_RUDDERSTACK_WRITE_KEY or NEXT_PUBLIC_RUDDERSTACK_DATAPLANE_URL');
      return;
    }

    if (analyticsInstance) {
      setAnalytics(analyticsInstance);
      return;
    }

    if (!initPromise) {
      initPromise = import('@rudderstack/analytics-js').then(
        ({ RudderAnalytics }) => {
          const instance = new RudderAnalytics();
          instance.load(writeKey, dataplaneUrl);
          analyticsInstance = instance;
          setAnalytics(instance);
        },
      );
    } else {
      initPromise.then(() => setAnalytics(analyticsInstance));
    }
  }, []);

  return analytics;
}
