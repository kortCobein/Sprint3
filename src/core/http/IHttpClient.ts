export interface IHttpClient {
  get<T>(url: string, signal?: AbortSignal): Promise<T>;
}
