import { ROUTE_PATH } from '../constant/routePath';
import { NewFeedPage } from '../screen/new_feed/NewFeedPage';

export const privateRoute = [
  {
    id: 'userProfile',
    path: ROUTE_PATH.PROFILE.USERNAME,
    element: <></>
  },
  {
    id: 'newfeed',
    path: ROUTE_PATH.NEW_FEED,
    element: <NewFeedPage/>
  }
];
