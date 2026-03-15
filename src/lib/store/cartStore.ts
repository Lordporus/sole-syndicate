import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/types';

/* ─────────────────────────────────────────────
   Cart Store — Zustand with persistence.

   Persists cart items to localStorage so they
   survive page refreshes. Drawer state is not
   persisted (UI state only).
   ───────────────────────────────────────────── */

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  totalPrice: number;

  // Actions
  addItem: (product: Product, size: number) => void;
  removeItem: (productId: string, size: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalPrice: 0,

      addItem: (product, size) => {
        const existing = get().items.find(
          (i) => i.product.id === product.id && i.size === size
        );
        let newItems: CartItem[];
        if (existing) {
          // Increment quantity — sneakers are limited, typically max 1
          newItems = get().items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          newItems = [...get().items, { product, size, quantity: 1 }];
        }
        set({ items: newItems, totalPrice: calculateTotal(newItems), isOpen: true });
      },

      removeItem: (productId, size) => {
        const newItems = get().items.filter(
          (i) => !(i.product.id === productId && i.size === size)
        );
        set({ items: newItems, totalPrice: calculateTotal(newItems) });
      },

      clearCart: () => set({ items: [], totalPrice: 0 }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'sole-syndicate-cart',
      // Only persist cart items, not UI state
      partialize: (state) => ({ items: state.items, totalPrice: state.totalPrice }),
    }
  )
);
