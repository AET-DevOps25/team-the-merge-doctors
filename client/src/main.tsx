import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';

// Create query client
const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { App } from 'antd';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App>
        <RouterProvider router={router} />
      </App>
    </QueryClientProvider>
  </StrictMode>,
);
