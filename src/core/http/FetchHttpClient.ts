import type { IHttpClient } from './IHttpClient';
import type { IPostHttpClient } from './IPostHttpClient';

export class FetchHttpClient implements IHttpClient, IPostHttpClient {
  async get<T>(url: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(
        `No se pudo completar la petición (${response.status} ${response.statusText})`,
      );
    }

    return response.json() as Promise<T>;
  }

  async post<TResponse, TBody>(
    url: string,
    body: TBody,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      throw new Error(
        `No se pudo completar la petición (${response.status} ${response.statusText})`,
      );
    }

    return response.json() as Promise<TResponse>;
  }
}
