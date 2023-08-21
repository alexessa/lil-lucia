import { useContext, createContext, ReactNode, useState } from "react";

import { ShoppingCart } from "../../components/shopping-cart/shopping-cart";
import { Product } from "../../models/product";
import { useLocalStorage } from "../hooks/local-storage-hook";

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (product: Product) => number;
  increaseCartQuantity: (product: Product) => void;
  decreaseCartQuantity: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  cartQuantity: number;
  cartItems: CartItems[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItems = {
  product: Product;
  quantity: number;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItems[]>(
    "shopping-cart",
    []
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemQuantity = (product: Product) => {
    return (
      cartItems.find((item) => item.product.ProductID === product.ProductID)
        ?.quantity || 0
    );
  };

  const increaseCartQuantity = (product: Product) => {
    setCartItems((currentItems) => {
      if (
        currentItems.find(
          (item) => item.product.ProductID === product.ProductID
        ) == null
      ) {
        return [...currentItems, { product, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.product.ProductID === product.ProductID) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (product: Product) => {
    setCartItems((currentItems) => {
      if (
        currentItems.find(
          (item) => item.product.ProductID === product.ProductID
        )?.quantity === 1
      ) {
        return currentItems.filter(
          (item) => item.product.ProductID !== product.ProductID
        );
      } else {
        return currentItems.map((item) => {
          if (item.product.ProductID === product.ProductID) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setCartItems((currentItems) => {
      return currentItems.filter(
        (item) => item.product.ProductID !== product.ProductID
      );
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
