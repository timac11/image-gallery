import { ImagesApiServiceType } from '@/api/images/images-api-service';
import { action, makeObservable, observable } from 'mobx';
import { ImageType } from '@/types/image';
import { UploadRequestFile } from 'rc-upload/lib/interface';

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

  setIsUploading(value: boolean) {
    this.isUploading = value;
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

  uploadImage = async (file: UploadRequestFile): Promise<void> => {
    this.setIsUploading(true);

    try {
      const form = new FormData();
      form.set('file', file);
      await this.imagesApiService.uploadImage(form);
    } catch (e) {
      // to do log error
      throw e;
    } finally {
      this.setIsUploading(false);
    }
  };

  clear = () => {
    this.isUploading = false;
    this.imagesLoading = false;
    this.images = [];
  };
}
