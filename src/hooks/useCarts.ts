import { useCallback, useEffect, useState } from "react";
import type { Cart } from "../core/models/cart";
import type { ICartService } from "../core/services/ICartService";
import type { IProductService } from "../features/products/domain/IProductService";
import type { Product } from "../features/products/domain/Product";

export function useCarts(
  cartService: ICartService,
  productService: IProductService,
) {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCarts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [cartsData, productsData] = await Promise.all([
        cartService.getAllCarts(),
        productService.getAll(),
      ]);

      setCarts(cartsData);
      setProducts(productsData);
    } catch {
      setError("No se pudieron cargar los carritos.");
    } finally {
      setLoading(false);
    }
  }, [cartService, productService]);

  useEffect(() => {
    loadCarts();
  }, [loadCarts]);

  return {
    carts,
    products,
    loading,
    error,
    retry: loadCarts,
  };
}
