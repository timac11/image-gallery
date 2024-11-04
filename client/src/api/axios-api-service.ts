import { ApiService } from '@/api/api.ts';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { api } from './axios';

class AxiosApiService implements ApiService {
  private readonly api: AxiosInstance = api;

  post<B, R>(url: string, data?: B, config?: AxiosRequestConfig<B>): Promise<R> {
    return this.api.post(url, data, config);
  }

  put<B, R>(url: string, data?: B): Promise<R> {
    return this.api.put(url, data);
  }

  get<P, R>(url: string, params?: P): Promise<R> {
    return this.api.get(url, { params });
  }
}

export default new AxiosApiService();
