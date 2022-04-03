export interface BasicQueryRequest {
  readonly page: { number: number; size: number };

  readonly sort: string;
}
