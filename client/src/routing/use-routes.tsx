import { useMemo } from 'react';
import { Route } from 'react-router-dom';
import { IRouteConfig, TRouterConfig } from '@/routing/types.ts';

export const useRoutes = <Path extends string, PageId extends string>(
  routerConfig: TRouterConfig<Path, PageId>,
) => {
  return useMemo(() => {
    const routeConfigs: IRouteConfig<Path, PageId>[] = Object.values(routerConfig);
    return routeConfigs.map(({ Component, guard, ...route }) => {
      const ComponentWithGuards = guard ? guard(Component) : Component;
      return (
        <Route
          key={route.path}
          path={route.parameter ? `${route.path}/:${route.parameter}` : route.path}
          element={<ComponentWithGuards />}
        />
      );
    });
  }, [routerConfig]);
};
