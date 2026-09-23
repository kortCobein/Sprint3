import type { IHttpClient } from '../../../core/http/IHttpClient';
import type { IProductService } from '../domain/IProductService';
import type { Product } from '../domain/Product';

export class FakeStoreProductService implements IProductService {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(httpClient: IHttpClient, baseUrl: string) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  getAll(signal?: AbortSignal): Promise<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, signal);
  }
}
