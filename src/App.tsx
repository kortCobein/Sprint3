// src/App.tsx
import { useState } from 'react';
import { CatalogPage } from './features/products/pages/CatalogPage';
import { ProductDetailPage } from './features/products/pages/ProductDetailPage';

function App() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  return (
    <div>
      {selectedProductId === null ? (
        <CatalogPage onSelectProduct={(id) => setSelectedProductId(id)} />
      ) : (
        <ProductDetailPage
          productId={selectedProductId}
          onBack={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
}

export default App;