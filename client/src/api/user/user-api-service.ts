import { AxiosResponse } from 'axios';
import { ApiService } from '@/api/api.ts';
import { AuthPayload } from '@/types/auth.ts';
import { UserType } from '@/types/user.ts';
import axiosApiService from '@/api/axios-api-service.ts';

class UserApiService {
  private readonly api: ApiService;

  constructor(apiService: ApiService) {
    this.api = apiService;
  }

  public auth(authPayload: AuthPayload): Promise<AxiosResponse<UserType>> {
    return this.api.post<AxiosResponse<UserType>, AuthPayload>('/auth', authPayload);
  }

  public fetchProfile(): Promise<AxiosResponse<UserType>> {
    return this.api.get<AxiosResponse<UserType>>('/profile');
  }
}

export type UserApiServiceType = typeof userApiService;

export const userApiService = new UserApiService(axiosApiService);
