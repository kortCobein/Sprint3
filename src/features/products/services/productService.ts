// src/features/products/services/productService.ts
import { FetchHttpClient } from '../../../core/http/FetchHttpClient';
import type { Product } from '../types/product';

export class ProductService {
  private httpClient: FetchHttpClient;
  private baseUrl = 'https://fakestoreapi.com';

  constructor() {
    this.httpClient = new FetchHttpClient();
  }

  async getProducts(): Promise<Product[]> {
    return await this.httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }

  async getCategories(): Promise<string[]> {
    return await this.httpClient.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.httpClient.get<Product[]>(
      `${this.baseUrl}/products/category/${encodeURIComponent(category)}`
    );
  }

  // GET /products/{id} - Detalle de un producto individual
  async getProductById(id: number | string): Promise<Product> {
    return await this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`);
  }
}