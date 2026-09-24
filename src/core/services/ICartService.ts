import type { Cart } from "../models/cart";

export interface ICartService {
  getAllCarts(): Promise<Cart[]>;
}
