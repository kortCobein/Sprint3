import type { CartService } from '../core/services/CartService';
import type { CartRequestPayload } from '../core/models/CartItem';

export class FakeStoreCartService implements CartService {
  async addToCart(payload: CartRequestPayload): Promise<{ id: number }> {
    const response = await fetch('https://fakestoreapi.com/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Error de red al intentar agregar el producto');
    }
    return response.json();
  }
}