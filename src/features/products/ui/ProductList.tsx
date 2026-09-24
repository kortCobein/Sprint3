import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Product } from '../domain/Product';
import type { ProductInput } from '../domain/ProductInput';

interface ProductListProps {
  products: Product[];
  disabled?: boolean;
  onUpdate?: (id: number, input: ProductInput) => Promise<boolean>;
}

export function ProductList({ products, disabled = false, onUpdate }: ProductListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<ProductInput | null>(null);

  if (products.length === 0) return <p>No hay productos disponibles.</p>;

  function startEditing(product: Product) {
    setEditingId(product.id);
    setDraft({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
  }

  async function saveEdit(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault();
    if (!draft || !onUpdate || draft.price <= 0 || !draft.title.trim()) return;
    const saved = await onUpdate(id, {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      category: draft.category.trim(),
      image: draft.image.trim(),
    });
    if (saved) {
      setEditingId(null);
      setDraft(null);
    }
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li className="product-card" key={product.id}>
          {editingId === product.id && draft ? (
            <form className="edit-form" onSubmit={(event) => saveEdit(event, product.id)}>
              <input required aria-label="Nombre del producto" value={draft.title}
                onChange={(event) => setDraft((current) => current ? { ...current, title: event.target.value } : current)} />
              <input required min="0.01" step="0.01" type="number" aria-label="Precio del producto" value={draft.price}
                onChange={(event) => setDraft((current) => current ? { ...current, price: Number(event.target.value) } : current)} />
              <input required aria-label="Categoría del producto" value={draft.category}
                onChange={(event) => setDraft((current) => current ? { ...current, category: event.target.value } : current)} />
              <input required type="url" aria-label="Imagen del producto" value={draft.image}
                onChange={(event) => setDraft((current) => current ? { ...current, image: event.target.value } : current)} />
              <textarea required rows={2} aria-label="Descripción del producto" value={draft.description}
                onChange={(event) => setDraft((current) => current ? { ...current, description: event.target.value } : current)} />
              <div className="product-actions">
                <button className="primary-button" disabled={disabled} type="submit">Guardar</button>
                <button disabled={disabled} type="button" onClick={() => { setEditingId(null); setDraft(null); }}>Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <div className="product-info"><strong>{product.title}</strong><small>{product.category}</small></div>
              <span>${product.price.toFixed(2)}</span>
              {onUpdate && (
                <div className="product-actions">
                  <button disabled={disabled} type="button" onClick={() => startEditing(product)}>Editar</button>
                </div>
              )}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
