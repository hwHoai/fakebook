import { ROUTE_PATH } from '../constant/routePath';
import { NewFeedPage } from '../screen/new_feed/NewFeedPage';

export const publicRoute = [
  {
    id: 'newfeed',
    path: ROUTE_PATH.NEW_FEED,
    element: <NewFeedPage />,
    index: true
  }
];
