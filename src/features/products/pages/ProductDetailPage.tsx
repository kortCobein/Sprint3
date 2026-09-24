// src/features/products/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { ProductService } from '../services/productService';

interface ProductDetailPageProps {
  productId: number;
  onBack: () => void;
}

const productService = new ProductService();

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onBack,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Lectura estricta del perfil desde la variable de sesión local
  const userRole = (localStorage.getItem('userRole') || 'cliente').toLowerCase();

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      try {
        const data = await productService.getProductById(productId); // GET /products/{id}
        if (!data || !data.id) {
          throw new Error('Producto no existe');
        }
        if (isMounted) {
          setProduct(data);
        }
      } catch {
        // Escenario 3: Alerta y retorno automático al catálogo general
        alert('Producto no disponible');
        onBack();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [productId, onBack]);

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <div className="spinner"></div>
        <p>Cargando detalle del producto...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div style={styles.container}>
      <button onClick={onBack} style={styles.backButton}>
        ← Volver al catálogo
      </button>

      <div style={styles.card}>
        <img src={product.image} alt={product.title} style={styles.image} />
        
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h2 style={styles.title}>{product.title}</h2>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p style={styles.description}>{product.description}</p>

          {/* Regla de negocio: Los botones se EXCLUYEN del DOM si no es Administrador[cite: 1] */}
          {userRole === 'administrador' && (
            <div style={styles.adminControls}>
              <button 
                onClick={() => alert(`Editar producto #${product.id}`)} 
                style={styles.editButton}
              >
                Editar
              </button>
              <button 
                onClick={() => alert(`Eliminar producto #${product.id}`)} 
                style={styles.deleteButton}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  backButton: {
    marginBottom: '20px',
    padding: '8px 16px',
    border: 'none',
    backgroundColor: '#6c757d',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  card: {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '32px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '24px',
    backgroundColor: '#fff',
    flexWrap: 'wrap' as const,
  },
  image: {
    maxWidth: '300px',
    maxHeight: '300px',
    objectFit: 'contain' as const,
    width: '100%',
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  category: {
    fontSize: '0.85rem',
    textTransform: 'uppercase' as const,
    color: '#6c757d',
    fontWeight: 'bold' as const,
  },
  title: {
    fontSize: '1.5rem',
    margin: 0,
    color: '#333',
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: 'bold' as const,
    color: '#2b7a78',
    margin: 0,
  },
  description: {
    color: '#555',
    lineHeight: 1.5,
  },
  adminControls: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#ffc107',
    color: '#212529',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
};