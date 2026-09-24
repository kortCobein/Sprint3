// src/features/products/components/CategoryFilter.tsx
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.chip,
          ...(selectedCategory === '' ? styles.activeChip : {}),
        }}
        onClick={() => onSelectCategory('')}
      >
        Ver todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          style={{
            ...styles.chip,
            ...(selectedCategory === cat ? styles.activeChip : {}),
          }}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
    marginBottom: '24px',
    justifyContent: 'center',
  },
  chip: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    fontSize: '0.9rem',
    textTransform: 'capitalize' as const,
    transition: 'all 0.2s ease',
  },
  activeChip: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff',
    fontWeight: 'bold' as const,
  },
};