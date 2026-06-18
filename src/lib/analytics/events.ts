import type { ApiObject, RudderAnalytics } from '@rudderstack/analytics-js';

import { VINYL_EVENTS } from './constants';
import type {
  CartItemPayload,
  CartViewedPayload,
  CheckoutStartedPayload,
  OrderCompletedPayload,
  RecordListViewedPayload,
  RecordPayload,
  RestockNotifyPayload,
  TrackPreviewedPayload,
} from './types';

/**
 * Cast a typed payload to RudderStack's ApiObject.
 * Our interfaces are structurally compatible; spreading into a fresh object
 * satisfies the index-signature requirement.
 */
function toApiObject(payload: object): ApiObject {
  return { ...payload } as unknown as ApiObject;
}

export function trackRecordViewed(
  analytics: RudderAnalytics,
  payload: RecordPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.RECORD_VIEWED, payload);
  analytics.track(VINYL_EVENTS.RECORD_VIEWED, toApiObject(payload));
}

export function trackRecordListViewed(
  analytics: RudderAnalytics,
  payload: RecordListViewedPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.RECORD_LIST_VIEWED, payload);
  analytics.track(VINYL_EVENTS.RECORD_LIST_VIEWED, toApiObject(payload));
}

export function trackRecordClicked(
  analytics: RudderAnalytics,
  payload: RecordPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.RECORD_CLICKED, payload);
  analytics.track(VINYL_EVENTS.RECORD_CLICKED, toApiObject(payload));
}

export function trackTrackPreviewed(
  analytics: RudderAnalytics,
  payload: TrackPreviewedPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.TRACK_PREVIEWED, payload);
  analytics.track(VINYL_EVENTS.TRACK_PREVIEWED, toApiObject(payload));
}

export function trackRecordAdded(
  analytics: RudderAnalytics,
  payload: CartItemPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.RECORD_ADDED, payload);
  analytics.track(VINYL_EVENTS.RECORD_ADDED, toApiObject(payload));
}

export function trackRecordRemoved(
  analytics: RudderAnalytics,
  payload: CartItemPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.RECORD_REMOVED, payload);
  analytics.track(VINYL_EVENTS.RECORD_REMOVED, toApiObject(payload));
}

export function trackCartViewed(
  analytics: RudderAnalytics,
  payload: CartViewedPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.CART_VIEWED, payload);
  analytics.track(VINYL_EVENTS.CART_VIEWED, toApiObject(payload));
}

export function trackCheckoutStarted(
  analytics: RudderAnalytics,
  payload: CheckoutStartedPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.CHECKOUT_STARTED, payload);
  analytics.track(VINYL_EVENTS.CHECKOUT_STARTED, toApiObject(payload));
}

export function trackOrderCompleted(
  analytics: RudderAnalytics,
  payload: OrderCompletedPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.ORDER_COMPLETED, payload);
  analytics.track(VINYL_EVENTS.ORDER_COMPLETED, toApiObject(payload));
}

export function trackRestockNotifyRequested(
  analytics: RudderAnalytics,
  payload: RestockNotifyPayload,
): void {
  console.log('[Analytics]', VINYL_EVENTS.RESTOCK_NOTIFY_REQUESTED, payload);
  analytics.track(VINYL_EVENTS.RESTOCK_NOTIFY_REQUESTED, toApiObject(payload));
}
