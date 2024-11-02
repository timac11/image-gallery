import { useContext } from 'react';

import { Store, StoreContext } from './store';

export const useStore = (): Store => {
  return useContext(StoreContext);
};

export type TStore = ReturnType<typeof useStore>;
