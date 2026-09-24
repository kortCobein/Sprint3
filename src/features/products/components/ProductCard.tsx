import React from 'react';
import type { Product } from '../types/product';
import { AddToCartActions } from '../../../components/AddToCartActions';

interface ProductCardProps {
  product: Product;
  userRole: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  userRole,
  onClick,
}) => {
  return (
    <div className="product-card" onClick={onClick} style={styles.card}>
      <img
        src={product.image}
        alt={product.title}
        style={styles.image}
        loading="lazy"
      />
      <h3 style={styles.title} title={product.title}>
        {product.title}
      </h3>
      <p style={styles.price}>${product.price.toFixed(2)}</p>

      <div onClick={(event) => event.stopPropagation()}>
        <AddToCartActions product={product} userRole={userRole} />
      </div>
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
    justifyContent: 'space-between',
    minHeight: '320px',
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
    maxHeight: '2.6em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    wordBreak: 'break-word' as const,
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold' as const,
    color: '#2b7a78',
    margin: '0',
  },
};
