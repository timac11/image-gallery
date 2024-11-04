export interface ApiService {
  post<R, B = undefined>(url: string, data?: B, config?: unknown): Promise<R>;
  put<R, B>(url: string, data?: B): Promise<R>;
  get<R, P = undefined>(url: string, params?: P): Promise<R>;
}
