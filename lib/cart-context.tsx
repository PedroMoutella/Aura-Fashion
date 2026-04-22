"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./products";

export interface CartItem { product: Product; qty: number; }

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  };

  const cartCount = items.reduce((a, i) => a + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
