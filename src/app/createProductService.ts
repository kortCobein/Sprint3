import { FetchHttpClient } from '../core/http/FetchHttpClient';
import { FakeStoreProductService } from '../features/products/infrastructure/FakeStoreProductService';

const DEFAULT_API_URL = 'https://fakestoreapi.com';

export function createProductService() {
  const httpClient = new FetchHttpClient();
  const apiUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_URL;

  return new FakeStoreProductService(httpClient, apiUrl.replace(/\/$/, ''));
}
