/**
 * Generates a short random ID (8 hex-ish characters).
 * Used for cart_id, order_id, etc.
 */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
