// src/features/products/services/productService.ts
import { FetchHttpClient } from '../../../core/http/FetchHttpClient';
import type { Product } from '../types/product';

export class ProductService {
  private httpClient: FetchHttpClient;
  private baseUrl = 'https://fakestoreapi.com';

  constructor() {
    this.httpClient = new FetchHttpClient();
  }

  // Consume el endpoint GET /products
  async getProducts(): Promise<Product[]> {
    return await this.httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }
}