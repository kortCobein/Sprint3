export interface IPostHttpClient {
  post<TResponse, TBody>(
    url: string,
    body: TBody,
    signal?: AbortSignal,
  ): Promise<TResponse>;
}
