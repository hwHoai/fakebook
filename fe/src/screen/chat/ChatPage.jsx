import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { CookieService } from '../../util/cookieService';
import { TokenService } from '../../util/tokenService';
import { UserMessageService } from '../../service/user/message/userMessage';

export const ChatPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [inbox, setInbox] = useState([]);

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
        const inboxList = await UserMessageService.getUserInboxList(currentUserId);
        setInbox(inboxList);
        if (inboxList.length > 0) {
          const firstFriendId = inboxList[0].friendId;
          navigate(`/chat/${firstFriendId}`);
        } else {
          console.warn('Inbox is empty');
        }
      } catch (error) {
        console.error('Error fetching inbox or navigating:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndNavigate();
  }, [navigate]);

  if (loading) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  if (inbox.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-[#f3ecfe]'>
        <h1 className='text-2xl font-bold text-gray-700'>No Chats Yet!</h1>
        <p className='text-gray-500 mt-2 text-center'>
          It looks like you haven't started chatting with anyone yet. <br />
          Find a friend and start a conversation!
        </p>
        <Link to='/' className='mt-6 px-6 py-3 bg-[#7940ed] text-white rounded-lg shadow hover:bg-[#5a2dbd]'>
          Back to New Feeds
        </Link>
      </div>
    );
  }

  return null;
};
