import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app.tsx';
import { BrowserRouter } from 'react-router-dom';
import { OnlineProvider } from '@/providers/online-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <OnlineProvider>
        <App />
      </OnlineProvider>
    </BrowserRouter>
  </StrictMode>,
);
