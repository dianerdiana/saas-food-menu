import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@workspace/ui/components/sonner';
import '@workspace/ui/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import FallbackSpinner from './components/fallback-spinner';
import { ThemeProvider } from './components/theme-provider';
import ability from './configs/acl/initial-ability';
import { router } from './router/router';
import { AbilityContext } from './utils/context/ability-context';
import { AuthContextProvider } from './utils/context/auth-context';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AbilityContext.Provider value={ability}>
          <ThemeProvider>
            <Suspense fallback={<FallbackSpinner />}>
              <RouterProvider router={router} />
            </Suspense>

            <Toaster />
          </ThemeProvider>
        </AbilityContext.Provider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
