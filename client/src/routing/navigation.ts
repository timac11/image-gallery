import { withAuth } from '../hocs/with-auth';

import { EPageId, EPath } from './paths';
import { TRouterConfig } from '@/routing/types.ts';
import { AuthPage } from '@/pages/auth/auth-page.tsx';
import { PhotosPage } from '@/pages/photos/photos-page.tsx';

export const routerConfig: TRouterConfig<EPath, EPageId> = {
  [EPageId.AUTH]: {
    Component: AuthPage,
    id: EPageId.AUTH,
    path: EPath.AUTH,
  },
  [EPageId.PHOTOS]: {
    Component: PhotosPage,
    id: EPageId.PHOTOS,
    path: EPath.PHOTOS,
    guard: withAuth,
  },
};
