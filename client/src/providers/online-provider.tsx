import { useOnLine } from '@/hooks/use-online.ts';
import React from 'react';
import { OffLineModal } from '@/components/off-line-modal/off-line-modal.tsx';

interface IOnlineProviderContext {
  isOnline: boolean;
}

const OnlineProviderContext = React.createContext<IOnlineProviderContext>({
  isOnline: true,
});

export const OnlineProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isOnline = useOnLine();

  return (
    <OnlineProviderContext.Provider value={{ isOnline }}>
      <OffLineModal visible={!isOnline} />
      {children}
    </OnlineProviderContext.Provider>
  );
};

export const useOnlineContext = () => React.useContext(OnlineProviderContext);
