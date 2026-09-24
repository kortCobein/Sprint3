import { useEffect, useState } from 'react';
import type { IProductService } from '../domain/IProductService';
import type { Product } from '../domain/Product';
import type { ProductInput } from '../domain/ProductInput';

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

export function useProducts(productService: IProductService) {
  const [state, setState] = useState<ProductsState>(initialState);
  const [saving, setSaving] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

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

  async function createProduct(input: ProductInput) {
    setSaving(true); setMutationError(null);
    try {
      const created = await productService.create(input);
      setState((current) => ({
        ...current,
        products: [{ ...input, ...created }, ...current.products],
      }));
      return true;
    } catch (error) {
      setMutationError(error instanceof Error ? error.message : 'No se pudo crear el producto');
      return false;
    } finally { setSaving(false); }
  }

  async function updateProduct(id: number, input: ProductInput) {
    setSaving(true); setMutationError(null);
    try {
      const updated = await productService.update(id, input);
      setState((current) => ({
        ...current,
        products: current.products.map((product) =>
          product.id === id ? { ...product, ...input, ...updated, id } : product,
        ),
      }));
      return true;
    } catch (error) {
      setMutationError(error instanceof Error ? error.message : 'No se pudo actualizar el producto');
      return false;
    } finally { setSaving(false); }
  }

  return { ...state, saving, mutationError, createProduct, updateProduct };
}
