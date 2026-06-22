import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { products } from "../data/products";
import type { CartItem, Product } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type StoreContextValue = {
  cart: CartItem[];
  favorites: string[];
  toast: string | null;
  cartCount: number;
  favoritesCount: number;
  subtotal: number;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateCartItem: (index: number, quantity: number) => void;
  removeCartItem: (index: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("urban-select-cart", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("urban-select-favorites", []);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  function notify(message: string) {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }

  function addToCart(product: Product, size: string, color: string, quantity = 1) {
    setCart((current) => {
      const existingIndex = current.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color === color,
      );

      if (existingIndex >= 0) {
        return current.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...current, { productId: product.id, size, color, quantity }];
    });

    notify(`${product.name} adicionado ao carrinho`);
  }

  function updateCartItem(index: number, quantity: number) {
    setCart((current) =>
      current
        .map((item, itemIndex) => (itemIndex === index ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function removeCartItem(index: number) {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
    notify("Produto removido do carrinho");
  }

  function clearCart() {
    setCart([]);
    notify("Checkout demonstrativo iniciado");
  }

  function toggleFavorite(productId: string) {
    const product = products.find((item) => item.id === productId);
    setFavorites((current) => {
      if (current.includes(productId)) {
        notify("Produto removido dos favoritos");
        return current.filter((item) => item !== productId);
      }

      notify(product ? `${product.name} salvo nos favoritos` : "Produto salvo nos favoritos");
      return [...current, productId];
    });
  }

  function isFavorite(productId: string) {
    return favorites.includes(productId);
  }

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
      cart,
      favorites,
      toast,
      cartCount,
      favoritesCount: favorites.length,
      subtotal,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart,
      toggleFavorite,
      isFavorite,
      notify,
    };
  }, [cart, favorites, toast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
