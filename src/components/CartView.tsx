import { useCart } from '../hooks/useCart';

export const CartView = () => {
  const { cartItems, updateQuantity, removeProduct } = useCart();

  // Calcula la suma total de dinero
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#666' }}>¡Agrega algunos productos para empezar!</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '15px' }}>
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Tu Carrito 🚀</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '500px', overflowY: 'auto' }}>
        {cartItems.map((item) => (
          <div key={item.product.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
            <img src={item.product.image} alt={item.product.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
            
            <div style={{ flexGrow: 1 }}>
              <strong style={{ display: 'block', fontSize: '0.85rem', marginBottom: '5px', lineHeight: '1.2' }}>
                {/* Corta el texto si es muy largo */}
                {item.product.title.length > 30 ? `${item.product.title.substring(0, 30)}...` : item.product.title}
              </strong>
              <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>${item.product.price.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
                style={{ width: '45px', padding: '3px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button 
                onClick={() => removeProduct(item.product.id)} 
                style={{ backgroundColor: 'transparent', color: '#ff4d4f', border: 'none', cursor: 'pointer', fontSize: '0.75rem', padding: '0' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '2px solid #333', paddingTop: '15px', textAlign: 'right' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Total: <span style={{ color: '#2ecc71' }}>${total.toFixed(2)}</span></h3>
        <button style={{ width: '100%', padding: '12px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Proceder al Pago
        </button>
      </div>
    </div>
  );
};