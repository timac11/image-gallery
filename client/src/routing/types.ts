import React from 'react';

export type TRouteGuard<P> = (Component: React.ComponentType<P>) => TGuardResult<P>;
export type TGuardResult<P> = React.ComponentType<P>;

export type TRouterConfig<Path extends string, PageId extends string> = {
  [K in PageId]?: IRouteConfig<Path, PageId>;
};
export interface IRouteConfig<
  Path extends string,
  PageId extends string,
  P = Record<string, never>,
> {
  path: Path;
  id: PageId;
  Component: React.ComponentType<P>;
  guard?: TRouteGuard<P>;
  parameter?: string;
}
