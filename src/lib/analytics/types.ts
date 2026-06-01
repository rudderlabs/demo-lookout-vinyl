export interface PageViewedPayload {
  page_name: string;
  page_path: string;
}

export interface RecordViewedPayload {
  record_id: string;
  record_slug: string;
  record_title: string;
  artist: string;
  genre: string;
  price_usd: number;
  in_stock: boolean;
  release_year: number;
}

export interface TrackPreviewedPayload {
  record_id: string;
  track_number: number;
  track_title: string;
  play_duration_ms: number;
  completed: boolean;
}

export interface RecordAddedToCartPayload {
  record_id: string;
  record_title: string;
  artist: string;
  price_usd: number;
  currency: 'USD';
}

export interface RecordRemovedFromCartPayload {
  record_id: string;
  record_title: string;
  artist: string;
  price_usd: number;
  quantity: number;
}

export interface CartViewedPayload {
  cart_item_count: number;
  cart_total_usd: number;
  record_ids: string[];
}

export interface CheckoutStartedPayload {
  cart_item_count: number;
  subtotal_usd: number;
  shipping_usd: number;
  order_total_usd: number;
  record_ids: string[];
}

export interface OrderCompletedPayload {
  order_id: string;
  cart_item_count: number;
  subtotal_usd: number;
  shipping_usd: number;
  total_usd: number;
  currency: 'USD';
  record_ids: string[];
}

export interface RestockNotifyRequestedPayload {
  record_id: string;
  record_title: string;
  artist: string;
}
