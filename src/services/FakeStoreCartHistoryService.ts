import type { Cart } from '../core/models/cart';
import type { ICartService } from '../core/services/ICartService';

export class FakeStoreCartHistoryService implements ICartService {
  private readonly baseUrl = 'https://fakestoreapi.com';

  async getAllCarts(): Promise<Cart[]> {
    const response = await fetch(`${this.baseUrl}/carts`);

    if (!response.ok) {
      throw new Error('No se pudieron obtener los carritos.');
    }

    const carts: Cart[] = await response.json();
    return carts;
  }
}
