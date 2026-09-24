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

  const getCartsData = useCallback(
    () =>
      Promise.all([
        cartService.getAllCarts(),
        productService.getAll(),
      ]),
    [cartService, productService],
  );

  const retry = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [cartsData, productsData] = await getCartsData();
      setCarts(cartsData);
      setProducts(productsData);
    } catch {
      setError('No se pudieron cargar los carritos.');
    } finally {
      setLoading(false);
    }
  }, [getCartsData]);

  useEffect(() => {
    let active = true;

    getCartsData()
      .then(([cartsData, productsData]) => {
        if (!active) return;
        setCarts(cartsData);
        setProducts(productsData);
        setError(null);
      })
      .catch(() => {
        if (active) {
          setError('No se pudieron cargar los carritos.');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [getCartsData]);

  return {
    carts,
    products,
    loading,
    error,
    retry,
  };
}
