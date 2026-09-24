import type { CartRequestPayload } from '../models/CartItem';

export interface CartService {
  addToCart(payload: CartRequestPayload): Promise<{ id: number }>;
}