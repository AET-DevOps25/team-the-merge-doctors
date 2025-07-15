import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from '@/contexts/AuthContext';

// Create query client
const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { App } from 'antd';
import axios from 'axios';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

if (process.env.NODE_ENV === 'production-kubernetes') {
  axios.defaults.baseURL =
    'https://mentor-pulse-devops25.student.k8s.aet.cit.tum.de';
}

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App>
          <RouterProvider router={router} />
        </App>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
