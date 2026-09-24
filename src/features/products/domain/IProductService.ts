import type { Product } from './Product';

export interface IProductService {
  getAll(signal?: AbortSignal): Promise<Product[]>;
}
