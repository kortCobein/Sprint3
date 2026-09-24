import type { Product } from './Product';
import type { ProductInput } from './ProductInput';

export interface IProductService {
  getAll(signal?: AbortSignal): Promise<Product[]>;
  create(input: ProductInput, signal?: AbortSignal): Promise<Product>;
}
