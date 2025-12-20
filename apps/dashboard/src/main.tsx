// React
import { StrictMode, Suspense } from 'react';

// Router Dom
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import FallbackSpinner from './components/fallback-spinner';

// Context
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './utils/context/auth-context';
import { AbilityContext } from './utils/context/ability-context';
import { ThemeProvider } from './components/theme-provider';

// Ability
import ability from './configs/acl/initial-ability';

// Styles
import '@workspace/ui/globals.css';

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

            <Toaster
              position='top-right'
              reverseOrder={false}
              gutter={8}
              containerClassName=''
              containerStyle={{}}
              toasterId='default'
              toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                removeDelay: 1000,
              }}
            />
          </ThemeProvider>
        </AbilityContext.Provider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
