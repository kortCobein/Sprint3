import type { IHttpClient } from './IHttpClient';

export class FetchHttpClient implements IHttpClient {
  async get<T>(url: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(
        `No se pudo completar la petición (${response.status} ${response.statusText})`,
      );
    }

    return response.json() as Promise<T>;
  }
}
