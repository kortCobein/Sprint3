import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Product } from '../core/models/Product';
import type { CartItem } from '../core/models/CartItem';
import { FakeStoreCartService } from '../services/FakeStoreCartService';

const cartService = new FakeStoreCartService();

let globalCart: CartItem[] = JSON.parse(
  localStorage.getItem('cart_data') || '[]',
) as CartItem[];

const listeners = new Set<Dispatch<SetStateAction<CartItem[]>>>();

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(globalCart);

  useEffect(() => {
    listeners.add(setCartItems);
    return () => {
      listeners.delete(setCartItems);
    };
  }, []);

  const updateGlobalCart = (newCart: CartItem[]) => {
    globalCart = newCart;
    localStorage.setItem('cart_data', JSON.stringify(newCart));
    listeners.forEach((listener) => listener(newCart));
  };

  const addProductToCart = async (product: Product, quantity: number) => {
    try {
      await cartService.addToCart({
        userId: 1,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: product.id, quantity }],
      });

      const existingItem = globalCart.find(
        (item) => item.product.id === product.id,
      );

      const newCart = existingItem
        ? globalCart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...globalCart, { product, quantity }];

      updateGlobalCart(newCart);
      return { success: true, message: '¡Agregado al carrito!' };
    } catch {
      return { success: false, message: 'Error al agregar el producto' };
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    updateGlobalCart(
      globalCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeProduct = (productId: number) => {
    updateGlobalCart(
      globalCart.filter((item) => item.product.id !== productId),
    );
  };

  return {
    cartItems,
    addProductToCart,
    updateQuantity,
    removeProduct,
  };
};
