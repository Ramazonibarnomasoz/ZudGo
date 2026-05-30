import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
  qty: number;
};

export type OrderStatus = "preparing" | "on_the_way" | "delivered";
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  payment: string;
  status: OrderStatus;
  createdAt: number;
  restaurantName: string;
};

type AppState = {
  authed: boolean;
  phone: string | null;
  onboardingDone: boolean;
  favorites: string[];
  cart: CartItem[];
  orders: Order[];
  address: string;
  setAuthed: (v: boolean, phone?: string) => void;
  setOnboardingDone: (v: boolean) => void;
  toggleFavorite: (id: string) => void;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  placeOrder: (o: Omit<Order, "id" | "createdAt" | "status">) => string;
  advanceOrder: (id: string) => void;
  setAddress: (a: string) => void;
  logout: () => void;
};

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      authed: false,
      phone: null,
      onboardingDone: false,
      favorites: [],
      cart: [],
      orders: [],
      address: "Душанбе, проспект Рудаки 25",
      setAuthed: (v, phone) => set({ authed: v, phone: phone ?? get().phone }),
      setOnboardingDone: (v) => set({ onboardingDone: v }),
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id) ? s.favorites.filter((x) => x !== id) : [...s.favorites, id],
        })),
      addToCart: (item, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((c) => c.id === item.id);
          if (existing) {
            return { cart: s.cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + qty } : c)) };
          }
          return { cart: [...s.cart, { ...item, qty }] };
        }),
      updateQty: (id, qty) =>
        set((s) => ({
          cart: qty <= 0 ? s.cart.filter((c) => c.id !== id) : s.cart.map((c) => (c.id === id ? { ...c, qty } : c)),
        })),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
      clearCart: () => set({ cart: [] }),
      placeOrder: (o) => {
        const id = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
        const order: Order = { ...o, id, createdAt: Date.now(), status: "preparing" };
        set((s) => ({ orders: [order, ...s.orders] }));
        return id;
      },
      advanceOrder: (id) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id
              ? { ...o, status: o.status === "preparing" ? "on_the_way" : "delivered" }
              : o,
          ),
        })),
      setAddress: (a) => set({ address: a }),
      logout: () => set({ authed: false, phone: null, cart: [], onboardingDone: true }),
    }),
    { name: "zudgo.app" },
  ),
);
