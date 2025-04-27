import { ROUTE_PATH } from '../constant/routePath';
import { ChatPage } from '../screen/chat/ChatPage';
import { ChatWithFriend } from '../screen/chat/ChatWithFriend';

export const privateRoute = [
  {
    id: 'userProfile',
    path: ROUTE_PATH.PROFILE.USERNAME,
    element: <></>
  },
  {
    id: 'chat',
    path: ROUTE_PATH.CHAT,
    element: <ChatPage />
  },
  {
    id: 'chat_with_friend',
    path: ROUTE_PATH.CHAT_WITH_FRIEND,
    element: <ChatWithFriend />
  }
];
