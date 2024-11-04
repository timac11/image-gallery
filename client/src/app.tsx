import './app.css';
import { useRoutes } from '@/routing/use-routes.tsx';
import { routerConfig } from '@/routing/navigation.ts';
import { Suspense } from 'react';
import { Spin } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import { EPath } from '@/routing/paths.ts';
import { MainPage } from '@/pages/main-page.tsx';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const routes = useRoutes(routerConfig);

  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<MainPage />}>
          {routes}
          <Route path="/" element={<Navigate to={EPath.PHOTOS} />} />
        </Route>
        <Route path="*" element={<Navigate to={EPath.PHOTOS} />} />
      </Routes>
    </Suspense>
  );
});

export default App;
