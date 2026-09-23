import { useEffect, useState } from 'react';
import type { IProductService } from '../domain/IProductService';
import type { Product } from '../domain/Product';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: null,
};

export function useProducts(productService: IProductService): ProductsState {
  const [state, setState] = useState<ProductsState>(initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setState((current) => ({ ...current, loading: true, error: null }));

      try {
        const products = await productService.getAll(controller.signal);
        setState({ products, loading: false, error: null });
      } catch (error) {
        if (controller.signal.aborted) return;

        setState({
          products: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Error al cargar productos',
        });
      }
    }

    void loadProducts();
    return () => controller.abort();
  }, [productService]);

  return state;
}
