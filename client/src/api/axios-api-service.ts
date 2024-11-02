import { ApiService } from '@/api/api.ts';
import { AxiosInstance } from 'axios';
import { api } from './axios';

class AxiosApiService implements ApiService {
  private readonly api: AxiosInstance = api;

  post<B, R>(url: string, data?: B): Promise<R> {
    return this.api.post<B, R>(url, data);
  }

  put<B, R>(url: string, data?: B): Promise<R> {
    return this.api.put<B, R>(url, data);
  }

  get<P, R>(url: string, params?: P): Promise<R> {
    return this.api.get(url, { params });
  }
}

export default new AxiosApiService();
