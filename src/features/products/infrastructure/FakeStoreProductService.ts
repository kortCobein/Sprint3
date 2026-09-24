import type { IHttpClient } from '../../../core/http/IHttpClient';
import type { IPostHttpClient } from '../../../core/http/IPostHttpClient';
import type { IProductService } from '../domain/IProductService';
import type { Product } from '../domain/Product';
import type { ProductInput } from '../domain/ProductInput';

type ProductHttpClient = IHttpClient & IPostHttpClient;

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
    return this.httpClient.post<Product, ProductInput>(
      `${this.baseUrl}/products`,
      input,
      signal,
    );
  }
}
