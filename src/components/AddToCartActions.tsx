import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import type { Product } from '../core/models/Product';

interface AddToCartActionsProps {
  product: Product;
  userRole: string;
}

export const AddToCartActions = ({ product, userRole }: AddToCartActionsProps) => {
  const { addProductToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (userRole === 'Auditor') return null;

  const handleAdd = async () => {
    if (quantity > 0) {
      const result = await addProductToCart(product, quantity);
      alert(result.message); 
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ width: '60px' }}
      />
      <button onClick={handleAdd}>Agregar al carrito</button>
    </div>
  );
};