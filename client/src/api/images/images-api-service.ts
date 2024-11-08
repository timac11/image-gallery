import { ApiService } from '@/api/api.ts';
import axiosApiService from '@/api/axios-api-service.ts';
import { AxiosResponse } from 'axios';
import { ImageType } from '@/types/image.ts';

class ImagesApiService {
  private readonly api: ApiService;

  constructor(apiService: ApiService) {
    this.api = apiService;
  }

  public fetchImages(): Promise<AxiosResponse<ImageType[]>> {
    return this.api.get<AxiosResponse<ImageType[]>>('/images');
  }

  public uploadImage(form: FormData): Promise<AxiosResponse<void>> {
    return this.api.post<AxiosResponse<void>, FormData>('/images/upload', form, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
}

export type ImagesApiServiceType = typeof imagesApiService;

export const imagesApiService = new ImagesApiService(axiosApiService);
