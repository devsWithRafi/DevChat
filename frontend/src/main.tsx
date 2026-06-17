import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import store from './app/store.ts';
import { RouterProvider } from 'react-router';
import SocketProvider from './context/SocketProvider.tsx';
import router from './app/routes/router.ts';
import { ClerkProvider } from '@clerk/react';
import { ThemeProvider } from './@/components/theme/theme-provider.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <SocketProvider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/sign-in"
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
      >
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ClerkProvider>
    </SocketProvider>
  </Provider>,
);
