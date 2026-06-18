export interface RecordPayload {
  record_id: string;
  title: string;
  artist: string;
  label: string;
  genre: string;
  format: string;
  price_usd: number;
  release_year: number;
  in_stock: boolean;
}

export interface RecordListViewedPayload {
  records: RecordPayload[];
}

export interface TrackPreviewedPayload {
  record_id: string;
  record_title: string;
  track_number: number;
  track_title: string;
  /** How long the preview actually played, in milliseconds. */
  play_duration_ms: number;
  /** true if the 10-second clip played to natural completion. */
  completed: boolean;
}

export interface CartItemPayload {
  record_id: string;
  title: string;
  artist: string;
  price_usd: number;
  quantity: number;
}

export interface CartViewedPayload {
  cart_id: string;
  items: CartItemPayload[];
  subtotal_usd: number;
  item_count: number;
}

export interface CheckoutStartedPayload {
  order_id: string;
  subtotal_usd: number;
  shipping_usd: number;
  total_usd: number;
  items: CartItemPayload[];
}

export interface OrderCompletedPayload {
  order_id: string;
  subtotal_usd: number;
  shipping_usd: number;
  total_usd: number;
  items: CartItemPayload[];
}

export interface RestockNotifyPayload {
  record_id: string;
  record_title: string;
}
