import { observer } from 'mobx-react-lite';
import React from 'react';
import { TGuardResult } from '@/routing/types.ts';

export function withAuth<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
): TGuardResult<P> {
  const HOC: TGuardResult<P> = (props) => {
    return <Component {...props} />;
  };

  HOC.displayName = `authGuard(${Component.displayName})`;

  return observer(HOC);
}
