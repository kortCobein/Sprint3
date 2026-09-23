import type { IHttpClient } from '../../../core/http/IHttpClient';
import type { IProductService } from '../domain/IProductService';
import type { Product } from '../domain/Product';

export class FakeStoreProductService implements IProductService {
  constructor(
    private readonly httpClient: IHttpClient,
    private readonly baseUrl: string,
  ) {}

  getAll(signal?: AbortSignal): Promise<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`, signal);
  }
}
