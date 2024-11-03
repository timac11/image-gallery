import { ImagesApiServiceType } from '@/api/images/images-api-service';
import { action, makeObservable, observable } from 'mobx';
import { ImageType } from '@/types/image';

export class ImagesStore {
  isUploading = false;
  imagesLoading = false;
  images: ImageType[] = [];

  constructor(private readonly imagesApiService: ImagesApiServiceType) {
    makeObservable(this, {
      isUploading: observable,
      imagesLoading: observable,
      images: observable,
      setImagesLoading: action,
      setImages: action,
    });
  }

  setImagesLoading(value: boolean) {
    this.imagesLoading = value;
  }

  setImages(images: ImageType[]) {
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
