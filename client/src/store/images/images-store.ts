import { ImagesApiServiceType } from '@/api/images/images-api-service';
import { action, observable } from 'mobx';
import { ImageType } from '@/types/image';

export class ImagesStore {
  @observable isUploading = false;
  @observable imagesLoading = false;
  @observable images: ImageType[] = [];

  constructor(private readonly imagesApiService: ImagesApiServiceType) {}

  @action setImagesLoading(value: boolean) {
    this.imagesLoading = value;
  }

  @action setImages(images: ImageType[]) {
    this.images = images;
  }

  fetchImages = async (): Promise<void> => {
    this.setImagesLoading(true);

    try {
      const { data } = await this.imagesApiService.fetchImages();
      this.setImages(data);
    } finally {
      this.setImagesLoading(false);
    }
  };
}
