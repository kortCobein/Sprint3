import type { IDeleteHttpClient } from './IDeleteHttpClient';
import type { IHttpClient } from './IHttpClient';
import type { IPostHttpClient } from './IPostHttpClient';
import type { IPutHttpClient } from './IPutHttpClient';

export class FetchHttpClient
  implements IHttpClient, IPostHttpClient, IPutHttpClient, IDeleteHttpClient
{
  async get<T>(url: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(
        `No se pudo completar la petición (${response.status} ${response.statusText})`,
      );
    }
    return response.json() as Promise<T>;
  }

  async post<TResponse, TBody>(url: string, body: TBody, signal?: AbortSignal): Promise<TResponse> {
    return this.send<TResponse, TBody>('POST', url, body, signal);
  }

  async put<TResponse, TBody>(url: string, body: TBody, signal?: AbortSignal): Promise<TResponse> {
    return this.send<TResponse, TBody>('PUT', url, body, signal);
  }

  async delete<TResponse>(url: string, signal?: AbortSignal): Promise<TResponse> {
    const response = await fetch(url, { method: 'DELETE', signal });
    if (!response.ok) {
      throw new Error(
        `No se pudo completar la petición (${response.status} ${response.statusText})`,
      );
    }
    return response.json() as Promise<TResponse>;
  }

  private async send<TResponse, TBody>(
    method: 'POST' | 'PUT',
    url: string,
    body: TBody,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
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
