import { useState, useEffect } from 'react';
import type { Product } from '../core/models/Product';
import type { CartItem } from '../core/models/CartItem';
import { FakeStoreCartService } from '../services/FakeStoreCartService';

const cartService = new FakeStoreCartService();

// Variables globales para conectar los componentes en tiempo real
let globalCart = JSON.parse(localStorage.getItem('cart_data') || '[]');
const listeners = new Set<React.Dispatch<React.SetStateAction<CartItem[]>>>();

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(globalCart);

  // Suscribir el componente a los cambios globales
  useEffect(() => {
    listeners.add(setCartItems);
    return () => { listeners.delete(setCartItems); };
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
        products: [{ productId: product.id, quantity }]
      });

      const existingItem = globalCart.find((item: CartItem) => item.product.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = globalCart.map((item: CartItem) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newCart = [...globalCart, { product, quantity }];
      }
      
      updateGlobalCart(newCart);
      return { success: true, message: '¡Agregado al carrito!' };
    } catch (error) {
      return { success: false, message: 'Error al agregar el producto' };
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = globalCart.map((item: CartItem) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateGlobalCart(newCart);
  };

  const removeProduct = (productId: number) => {
    const newCart = globalCart.filter((item: CartItem) => item.product.id !== productId);
    updateGlobalCart(newCart);
  };

  return { cartItems, addProductToCart, updateQuantity, removeProduct };
};