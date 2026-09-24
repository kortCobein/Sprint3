import { useState, useEffect } from 'react';
import type { Product } from '../core/models/Product';
import type { CartItem } from '../core/models/CartItem';
import { FakeStoreCartService } from '../services/FakeStoreCartService';

const cartService = new FakeStoreCartService();

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem('cart_data');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart_data', JSON.stringify(cartItems));
  }, [cartItems]);

  const addProductToCart = async (product: Product, quantity: number) => {
    try {
      await cartService.addToCart({
        userId: 1,
        date: new Date().toISOString().split('T')[0],
        products: [{ productId: product.id, quantity }]
      });

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.product.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prevItems, { product, quantity }];
      });
      return { success: true, message: 'Producto añadido exitosamente' };
    } catch (error) {
      return { success: false, message: 'Error al agregar el producto' };
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeProduct = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  return { cartItems, addProductToCart, updateQuantity, removeProduct };
};