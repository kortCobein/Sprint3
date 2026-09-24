// src/features/products/services/productService.ts
import { FetchHttpClient } from '../../../core/http/FetchHttpClient';
import type { Product } from '../types/product';

export class ProductService {
  private httpClient: FetchHttpClient;
  private baseUrl = 'https://fakestoreapi.com';

  constructor() {
    this.httpClient = new FetchHttpClient();
  }

  // GET /products - Catálogo completo
  async getProducts(): Promise<Product[]> {
    return await this.httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }

  // GET /products/categories - Obtener lista de categorías disponibles
  async getCategories(): Promise<string[]> {
    return await this.httpClient.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  // GET /products/category/{category} - Obtener productos por categoría[cite: 3]
  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.httpClient.get<Product[]>(
      `${this.baseUrl}/products/category/${encodeURIComponent(category)}`
    );
  }
}