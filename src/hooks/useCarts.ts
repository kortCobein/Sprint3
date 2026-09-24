import { useCallback, useEffect, useState } from 'react';
import type { Cart } from '../core/models/cart';
import type { ICartService } from '../core/services/ICartService';
import type { IProductService } from '../features/products/domain/IProductService';
import type { Product } from '../features/products/domain/Product';

export function useCarts(
  cartService: ICartService,
  productService: IProductService,
) {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarts = useCallback(async () => {
    try {
      const [cartsData, productsData] = await Promise.all([
        cartService.getAllCarts(),
        productService.getAll(),
      ]);

      setCarts(cartsData);
      setProducts(productsData);
      setError(null);
    } catch {
      setError('No se pudieron cargar los carritos.');
    } finally {
      setLoading(false);
    }
  }, [cartService, productService]);

  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    void fetchCarts();
  }, [fetchCarts]);

  useEffect(() => {
    void fetchCarts();
  }, [fetchCarts]);

  return {
    carts,
    products,
    loading,
    error,
    retry,
  };
}
