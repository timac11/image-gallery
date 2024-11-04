import React from 'react';
import { TGuardResult } from '@/routing/types.ts';
import { useStore } from '@/store/use-store.ts';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { PageSkeleton } from '@/components/page-skeleton/page-skeleton.tsx';

export function withoutAuth<P extends React.JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  FallbackComponent: React.ComponentType = PageSkeleton,
): TGuardResult<P> {
  const HOC: TGuardResult<P> = (props) => {
    const {
      userStore: { isAuthorized, isLoading, isFetched, fetchProfile },
    } = useStore();

    React.useEffect(() => {
      if (!isFetched && !isLoading) {
        fetchProfile().catch(console.error);
      }
    }, [fetchProfile, isFetched, isLoading]);

    if (isFetched) {
      if (!isAuthorized) {
        return <Component {...props} />;
      }
      return <Navigate to="/" />;
    }

    return <FallbackComponent />;
  };

  HOC.displayName = `withoutAuthGuard(${Component.displayName})`;

  return observer(HOC);
}
