// src/App.tsx
import { useState } from "react";
import { CatalogPage } from "./features/products/pages/CatalogPage";
import { ProductDetailPage } from "./features/products/pages/ProductDetailPage";
import { CartsPage } from "./components/CartsPage";
import { BrowserSessionService } from "./features/auth/infrastructure/BrowserSessionService";

function App() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const sessionService = new BrowserSessionService();
  const session = sessionService.load();

  return (
    <div>
      {selectedProductId === null ? (
        <>
          <CatalogPage onSelectProduct={(id) => setSelectedProductId(id)} />

          {session && (
            <>
              <hr />
              <CartsPage userRole={session.user.role} />
            </>
          )}
        </>
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
