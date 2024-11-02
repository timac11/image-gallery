import { createContext } from 'react';
import { UserStore } from '@/store/user/user-store.ts';
import { ImagesStore } from '@/store/images/images-store.ts';
import { userApiService } from '@/api/user/user-api-service.ts';
import { imagesApiService } from '@/api/images/images-api-service.ts';

export class Store {
  readonly userStore: UserStore;
  readonly imagesStore: ImagesStore;

  constructor() {
    this.userStore = new UserStore(userApiService);
    this.imagesStore = new ImagesStore(imagesApiService);
  }
}

export const StoreContext = createContext(new Store());
