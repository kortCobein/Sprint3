export interface IPutHttpClient {
  put<TResponse, TBody>(
    url: string,
    body: TBody,
    signal?: AbortSignal,
  ): Promise<TResponse>;
}
