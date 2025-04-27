import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CookieService } from '../../util/cookieService';
import { TokenService } from '../../util/tokenService';
import { UserMessageService } from '../../service/user/message/userMessage';

export const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndNavigate = async () => {
      try {
        const token = CookieService.getCookie('accessToken');
        if (!token) {
          console.error('Access token not found');
          return;
        }

        const decodedToken = TokenService.decodeToken(token);
        const currentUserId = decodedToken.userId;
        const inbox = await UserMessageService.getUserInboxList(currentUserId);
        console.log('Inbox:', inbox);
        if (inbox.length > 0) {
          const firstFriendId = inbox[0].friendId;
          navigate(`/chat/${firstFriendId}`);
        } else {
          console.warn('Inbox is empty');
        }
      } catch (error) {
        console.error('Error fetching inbox or navigating:', error);
      }
    };

    fetchAndNavigate();
  }, [navigate]);

  return null;
};
