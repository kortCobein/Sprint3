// src/features/products/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick} style={styles.card}>
      <img 
        src={product.image} 
        alt={product.title} 
        style={styles.image} 
        loading="lazy" 
      />
      {/* El atributo title muestra el nombre completo al pasar el cursor */}
      <h3 style={styles.title} title={product.title}>
        {product.title}
      </h3>
      <p style={styles.price}>${product.price.toFixed(2)}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between', // Alinea la imagen arriba, el título al centro y el precio abajo
    height: '320px',                  // Altura fija uniforme para todas las tarjetas
    boxSizing: 'border-box' as const,
  },
  image: {
    width: '100%',
    height: '140px',
    objectFit: 'contain' as const,
  },
  title: {
    fontSize: '0.9rem',
    margin: '8px 0',
    color: '#333',
    lineHeight: '1.3em',
    maxHeight: '2.6em',              // Permite máximo 2 líneas de texto
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,               // Corta el texto a la segunda línea agregando "..."
    WebkitBoxOrient: 'vertical' as const,
    wordBreak: 'break-word' as const,
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2b7a78',
    margin: '0',
  },
};