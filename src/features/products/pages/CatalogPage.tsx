// src/features/products/pages/CatalogPage.tsx
import React, { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { ProductService } from '../services/productService';
import { ProductCard } from '../components/ProductCard';

const productService = new ProductService();

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCatalog = async () => {
      try {
        const data = await productService.getProducts();
        if (isMounted) {
          setProducts(data);
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

    fetchCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRetry = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Escenario 2: Estado de carga (Loading)
  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  // Escenario 3: Manejo de error de conexión
  if (error) {
    return (
      <div style={styles.centerContainer}>
        <p>Hubo un problema al cargar el catálogo de productos.</p>
        <button onClick={handleRetry} style={styles.retryButton}>
          Reintentar
        </button>
      </div>
    );
  }

  // Escenario 1: Renderizado del catálogo
  return (
    <div style={styles.container}>
      <h2>Catálogo de Productos</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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