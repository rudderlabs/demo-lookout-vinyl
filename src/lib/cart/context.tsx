'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Record } from '@/data/records';

interface CartItem {
  recordId: string;
  artist: string;
  title: string;
  priceUsd: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; record: Record }
  | { type: 'REMOVE'; recordId: string }
  | { type: 'CLEAR' };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.recordId === action.record.id,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.recordId === action.record.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            recordId: action.record.id,
            artist: action.record.artist,
            title: action.record.title,
            priceUsd: action.record.priceUsd,
            quantity: 1,
          },
        ],
      };
    }
    case 'REMOVE':
      return {
        items: state.items.filter((i) => i.recordId !== action.recordId),
      };
    case 'CLEAR':
      return { items: [] };
  }
}

interface CartContextValue {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  addRecord: (record: Record) => void;
  removeRecord: (recordId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.priceUsd * i.quantity,
    0,
  );
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const value: CartContextValue = {
    items: state.items,
    subtotal,
    itemCount,
    addRecord: (record) => dispatch({ type: 'ADD', record }),
    removeRecord: (recordId) => dispatch({ type: 'REMOVE', recordId }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
