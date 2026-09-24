// src/features/products/pages/CatalogPage.tsx
import React, { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { ProductService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';

const productService = new ProductService();

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Carga inicial: obtiene las categorías y el catálogo general[cite: 3]
  useEffect(() => {
    let isMounted = true;

    const initData = async () => {
      try {
        const [catsData, productsData] = await Promise.all([
          productService.getCategories(),
          productService.getProducts(),
        ]);

        if (isMounted) {
          setCategories(catsData);
          setProducts(productsData);
          setError(false);
        }
      } catch {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Manejador al seleccionar una categoría o "Ver todos"[cite: 3]
  const handleSelectCategory = async (category: string) => {
    setSelectedCategory(category);
    setProducts([]); // Regla de negocio: limpiar arreglo local antes de la petición[cite: 3]
    setLoading(true); // Consistencia de carga: activa el spinner/cargador[cite: 3]
    setError(false);

    try {
      const data = category
        ? await productService.getProductsByCategory(category) // Petición por categoría[cite: 3]
        : await productService.getProducts(); // "Ver todos" restablece el catálogo[cite: 3]
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = selectedCategory
        ? await productService.getProductsByCategory(selectedCategory)
        : await productService.getProducts();
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Catálogo de Productos</h2>

      {/* Componente de filtrado por categorías[cite: 3] */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Estado de carga[cite: 3] */}
      {loading && (
        <div style={styles.centerContainer}>
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      )}

      {/* Estado de error */}
      {!loading && error && (
        <div style={styles.centerContainer}>
          <p>Hubo un problema al obtener los datos.</p>
          <button onClick={handleRetry} style={styles.retryButton}>
            Reintentar
          </button>
        </div>
      )}

      {/* Renderizado de catálogo filtrado */}
      {!loading && !error && (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    gap: '12px',
  },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};