import { ROUTE_PATH } from '../constant/routePath';
import { NewFeedPage } from '../screen/new_feed/NewFeedPage';
import { LoginPage } from '../screen/login/LoginPage';
import { RegisterPage } from '../screen/register/RegisterPage';
import { Test } from '../screen/test/Test';
import { ProfilePage } from '../screen/profile/ProfilePage';
import { SearchResultPage } from '../screen/search/SearchResultPage';

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
  },
  {
    id: 'test',
    path: ROUTE_PATH.TEST,
    element: <Test />,
    index: true
  },
  {
    id: 'profile',
    path: ROUTE_PATH.PROFILE,
    element: <ProfilePage />,
    index: true
  },
  {
    id: 'search_result',
    path: ROUTE_PATH.SEARCH_RESULT,
    element: <SearchResultPage />,
    index: true
  }
];
