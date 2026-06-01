import { getAnalytics } from './use-rudder-analytics';
import { ANALYTICS_EVENTS } from './constants';
import type {
  PageViewedPayload,
  RecordViewedPayload,
  TrackPreviewedPayload,
  RecordAddedToCartPayload,
  RecordRemovedFromCartPayload,
  CartViewedPayload,
  CheckoutStartedPayload,
  OrderCompletedPayload,
  RestockNotifyRequestedPayload,
} from './types';

export function trackPageViewed(payload: PageViewedPayload): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Page Viewed', payload);
  analytics.page(payload.page_name, payload.page_name, payload);
}

export function trackRecordViewed(payload: RecordViewedPayload): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Record Viewed', payload);
  analytics.track(ANALYTICS_EVENTS.RECORD_VIEWED, payload);
}

export function trackTrackPreviewed(payload: TrackPreviewedPayload): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Track Previewed', payload);
  analytics.track(ANALYTICS_EVENTS.TRACK_PREVIEWED, payload);
}

export function trackRecordAddedToCart(payload: RecordAddedToCartPayload): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Record Added to Cart', payload);
  analytics.track(ANALYTICS_EVENTS.RECORD_ADDED_TO_CART, payload);
}

export function trackRecordRemovedFromCart(
  payload: RecordRemovedFromCartPayload,
): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Record Removed from Cart', payload);
  analytics.track(ANALYTICS_EVENTS.RECORD_REMOVED_FROM_CART, payload);
}

export function trackCartViewed(payload: CartViewedPayload): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Cart Viewed', payload);
  analytics.track(ANALYTICS_EVENTS.CART_VIEWED, payload);
}

export function trackCheckoutStarted(payload: CheckoutStartedPayload): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Checkout Started', payload);
  analytics.track(ANALYTICS_EVENTS.CHECKOUT_STARTED, payload);
}

export function trackOrderCompleted(payload: OrderCompletedPayload): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Order Completed', payload);
  analytics.track(ANALYTICS_EVENTS.ORDER_COMPLETED, payload);
}

export function trackRestockNotifyRequested(
  payload: RestockNotifyRequestedPayload,
): void {
  const analytics = getAnalytics();
  if (!analytics) return;
  console.log('[analytics] Restock Notify Requested', payload);
  analytics.track(ANALYTICS_EVENTS.RESTOCK_NOTIFY_REQUESTED, payload);
}
