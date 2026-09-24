import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ProductInput } from '../domain/ProductInput';

interface ProductCreateFormProps {
  disabled?: boolean;
  onCreate: (input: ProductInput) => Promise<boolean>;
}

const emptyProduct: ProductInput = {
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
};

export function ProductCreateForm({
  disabled = false,
  onCreate,
}: ProductCreateFormProps) {
  const [form, setForm] = useState<ProductInput>(emptyProduct);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.category.trim() ||
      !form.image.trim() ||
      form.price <= 0
    ) {
      return;
    }

    const created = await onCreate({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
    });

    if (created) setForm(emptyProduct);
  }

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <div className="inventory-grid">
        <label>
          Nombre
          <input
            required
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
          />
        </label>

        <label>
          Precio
          <input
            required
            min="0.01"
            step="0.01"
            type="number"
            value={form.price || ''}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                price: Number(event.target.value),
              }))
            }
          />
        </label>

        <label>
          Categoría
          <input
            required
            value={form.category}
            onChange={(event) =>
              setForm((current) => ({ ...current, category: event.target.value }))
            }
          />
        </label>

        <label>
          URL de imagen
          <input
            required
            type="url"
            value={form.image}
            onChange={(event) =>
              setForm((current) => ({ ...current, image: event.target.value }))
            }
          />
        </label>
      </div>

      <label>
        Descripción
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({ ...current, description: event.target.value }))
          }
        />
      </label>

      <button className="primary-button" disabled={disabled} type="submit">
        {disabled ? 'Guardando...' : 'Agregar producto'}
      </button>
    </form>
  );
}
