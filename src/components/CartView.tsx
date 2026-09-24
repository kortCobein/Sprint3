import { useCart } from '../hooks/useCart';

export const CartView = () => {
  const { cartItems, updateQuantity, removeProduct } = useCart();

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Tu carrito está vacío 🛒</h2>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Tu Carrito de Compras 🚀</h2>
      {cartItems.map((item) => (
        <div 
          key={item.product.id} 
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}
        >
          <strong>Producto #{item.product.id}</strong>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
              style={{ width: '60px', padding: '5px' }}
            />
            <button 
              onClick={() => removeProduct(item.product.id)}
              style={{ backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Eliminar ❌
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};