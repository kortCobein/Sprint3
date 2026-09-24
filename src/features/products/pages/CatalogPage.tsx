import React, { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { ProductService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';

interface CatalogPageProps {
  onSelectProduct?: (id: number) => void;
  userRole: string;
}

const productService = new ProductService();

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  userRole,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void initData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectCategory = async (category: string) => {
    setSelectedCategory(category);
    setProducts([]);
    setLoading(true);
    setError(false);

    try {
      const data = category
        ? await productService.getProductsByCategory(category)
        : await productService.getProducts();
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
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {loading && (
        <div style={styles.centerContainer}>
          <div className="spinner" />
          <p>Cargando productos...</p>
        </div>
      )}

      {!loading && error && (
        <div style={styles.centerContainer}>
          <p>Hubo un problema al obtener los datos.</p>
          <button onClick={handleRetry} style={styles.retryButton}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              userRole={userRole}
              onClick={() => onSelectProduct?.(product.id)}
            />
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
