import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { InboxList } from '../../components/common/InboxList';
import { ProfilePanel } from '../../components/common/ProfilePanel';
import { ChatWindow } from '../../components/common/ChatWindow';
import { CookieService } from '../../util/cookieService';
import { TokenService } from '../../util/tokenService';
import { UserMessageService } from '../../service/user/message/userMessage';
import { UserInforService } from '../../service/user/userInforService';
import { DEFAULT_AVATAR_URL, DEFAULT_AVATAR_FILENAME } from '../../constant/general';
export const ChatWithFriend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tempUser } = location.state || {}; // Get the tempUser from the state
  const { friendId } = useParams();
  const [inboxList, setInboxList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const token = CookieService.getCookie('accessToken');
        if (!token) {
          console.error('Access token not found');
          return;
        }

        setAccessToken(token);

        const decodedToken = TokenService.decodeToken(token);
        const currentUserId = decodedToken.userId;
        setUserId(currentUserId);

        const inbox = await UserMessageService.getUserInboxList(currentUserId);
        // Process each friend's avatar
        const updatedInbox = await Promise.all(
          inbox.map(async (friend) => {
            if (friend.friendAvatar === DEFAULT_AVATAR_FILENAME) {
              return { ...friend, friendAvatarUrl: DEFAULT_AVATAR_URL };
            } else {
              const avatarUrl = await UserInforService.getFileFormFirebase(friend.friendAvatar);
              return { ...friend, friendAvatarUrl: avatarUrl };
            }
          })
        );

        if (tempUser) {
          const isUserInInbox = updatedInbox.some((friend) => friend.friendId === tempUser.friendId);
          if (!isUserInInbox) {
            updatedInbox.unshift(tempUser);
          }
        }

        setInboxList(updatedInbox);
      } catch (error) {
        console.error('Error fetching inbox:', error);
      }
    };

    fetchInbox();
  }, [navigate]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!friendId) return;

      try {
        await UserMessageService.markMessagesAsRead(Number(friendId));
        setInboxList((prevInboxList) =>
          prevInboxList.map((item) => (item.friendId === Number(friendId) ? { ...item, lastMessageRead: true } : item))
        );
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    };

    markMessagesAsRead();
  }, [friendId]);

  // Function to update the inbox list
  const updateInboxList = useCallback((friendId, message, sentByMe, sentByAnotherFriend) => {
    setInboxList((prevInboxList) => {
      const updatedInbox = prevInboxList.map((item) =>
        item.friendId === friendId
          ? {
              ...item,
              lastMessage: message.content,
              lastMessageTime: message.createdAt,
              sentByMe,
              lastMessageRead: sentByMe || !sentByAnotherFriend
            }
          : item
      );
      // Move the updated friend to the top of the list
      const updatedFriend = updatedInbox.find((item) => item.friendId === friendId);
      const otherFriends = updatedInbox.filter((item) => item.friendId !== friendId);

      return [updatedFriend, ...otherFriends];
    });
  }, []);

  // Find the current friend's name
  const currentFriend = inboxList.find((friend) => friend.friendId === Number(friendId));
  const currentFriendName = currentFriend ? currentFriend.friendUsername : 'Unknown';
  const friendAvatarUrl =
    inboxList.find((friend) => friend.friendId === Number(friendId))?.friendAvatarUrl || DEFAULT_AVATAR_URL;

  return (
    <div className='flex h-screen bg-white'>
      <InboxList inbox={inboxList} friendId={friendId} />

      <ChatWindow
        onMessageUpdate={updateInboxList}
        userId={userId}
        friendId={friendId}
        accessToken={accessToken}
        friendName={currentFriendName}
        friendAvatarUrl={friendAvatarUrl}
      />

      <ProfilePanel friendId={friendId} friendName={currentFriendName} friendAvatarUrl={friendAvatarUrl} />
    </div>
  );
};
