import { ROUTE_PATH } from '../constant/routePath';
import { NewFeedPage } from '../screen/new_feed/NewFeedPage';
import { LoginPage } from '../screen/login/LoginPage';
import { RegisterPage } from '../screen/register/RegisterPage';

export const publicRoute = [
  { 
    id: 'default_page',
    path: ROUTE_PATH.HOME,
    element: <NewFeedPage />,
    index: true 
  },
  {
    id: 'register',
    path: ROUTE_PATH.REGISTER,
    element: <RegisterPage />,
    index: true
  },
  {
    id: 'login',
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
    index: true
  }
];
