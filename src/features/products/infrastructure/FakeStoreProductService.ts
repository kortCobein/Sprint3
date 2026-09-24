import type { IDeleteHttpClient } from '../../../core/http/IDeleteHttpClient';
import type { IHttpClient } from '../../../core/http/IHttpClient';
import type { IPostHttpClient } from '../../../core/http/IPostHttpClient';
import type { IPutHttpClient } from '../../../core/http/IPutHttpClient';
import type { IProductService } from '../domain/IProductService';
import type { Product } from '../domain/Product';
import type { ProductInput } from '../domain/ProductInput';

type ProductHttpClient = IHttpClient & IPostHttpClient & IPutHttpClient & IDeleteHttpClient;

export class FakeStoreProductService implements IProductService {
  private readonly httpClient: ProductHttpClient;
  private readonly baseUrl: string;

  constructor(httpClient: ProductHttpClient, baseUrl: string) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  getAll(signal?: AbortSignal): Promise<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, signal);
  }

  create(input: ProductInput, signal?: AbortSignal): Promise<Product> {
    return this.httpClient.post<Product, ProductInput>(`${this.baseUrl}/products`, input, signal);
  }

  update(id: number, input: ProductInput, signal?: AbortSignal): Promise<Product> {
    return this.httpClient.put<Product, ProductInput>(`${this.baseUrl}/products/${id}`, input, signal);
  }

  remove(id: number, signal?: AbortSignal): Promise<Product> {
    return this.httpClient.delete<Product>(`${this.baseUrl}/products/${id}`, signal);
  }
}
