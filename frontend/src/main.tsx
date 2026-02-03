import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import store from './app/store.ts';
import { RouterProvider } from 'react-router';
import SocketProvider from './context/SocketProvider.tsx';
import router from './app/routes/router.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <SocketProvider>
            <RouterProvider router={router} />
        </SocketProvider>
    </Provider>,
);
