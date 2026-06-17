import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: '',
        index: true,
        Component: HomePage,
      },

      { path: '/sign-in', Component: LoginPage },
      { path: '/sign-up', Component: SignupPage },
    ],
  },
]);

export default router;
