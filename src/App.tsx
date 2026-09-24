import { useMemo } from 'react';
import { FetchHttpClient } from './services/FetchHttpClient';
import { FakeStoreProductService } from './services/FakeStoreProductService';
import { useProducts } from './hooks/useProducts';

function App() {
  // Inyección de dependencias (Principio DIP de SOLID)
  const productService = useMemo(() => {
    const httpClient = new FetchHttpClient();
    return new FakeStoreProductService(httpClient);
  }, []);

  const { products, loading, error } = useProducts(productService);

  if (loading) return <p style={{ padding: '20px' }}>Cargando catálogo base...</p>;
  if (error) return <p style={{ padding: '20px', color: 'red' }}>Error: {error}</p>;

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Arquitectura Base - Proyecto React + SOLID</h1>
      <p>Servicio conectado exitosamente a FakeStoreAPI.</p>

      <h2>Productos obtenidos ({products.length}):</h2>
      <ul>
        {products.slice(0, 5).map((product) => (
          <li key={product.id}>
            <strong>{product.title}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
