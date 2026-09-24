export interface IDeleteHttpClient {
  delete<TResponse>(url: string, signal?: AbortSignal): Promise<TResponse>;
}
