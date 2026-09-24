import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartRequestPayload {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}