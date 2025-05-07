import { Search, MoreHorizontal } from 'lucide-react'; // Import icons
import { useTranslation } from 'react-i18next'; // Import i18n translation
import { useRecommendUsers } from '../../hooks/useRecommendUsers';
import { UserInforService } from '../../service/user/userInforService'; // Import user information service
import { DEFAULT_AVATAR_URL, DEFAULT_AVATAR_FILENAME } from '../../constant/general'; // Import constants
import { useEffect, useState } from 'react';
import { TokenService } from '../../util/tokenService'; // Import token service
import { CookieService } from '../../util/cookieService'; // Import cookie <service></service>
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import { useContacts } from '../../hooks/useContacts';

export const SidebarRight = () => {
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [contactsRecommendations, setContactsRecommendations] = useState([]);

  const authToken = CookieService.getCookie('accessToken');
  const { userId } = TokenService.decodeToken(authToken) || {};

  const { recommendUsers } = useRecommendUsers(userId);
  const { contacts } = useContacts(userId);

  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAvatars = async () => {
      const updatedRecommendation = await Promise.all(
        recommendUsers.map(async (user) => {
          if (user.avatar === DEFAULT_AVATAR_FILENAME || user.avatar === null) {
            return { ...user, userProfileImageUrl: DEFAULT_AVATAR_URL };
          } else {
            const avatarUrl = await UserInforService.getFileFormFirebase(user.userProfileImage);
            return { ...user, userProfileImageUrl: avatarUrl };
          }
        })
      );

      setUserRecommendations(updatedRecommendation);
    };

    fetchAvatars();
  }, [recommendUsers]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const updatedContacts = await Promise.all(
        contacts.map(async (user) => {
          if (user.avatar === DEFAULT_AVATAR_FILENAME || user.avatar === null) {
            return { ...user, userProfileImageUrl: DEFAULT_AVATAR_URL };
          } else {
            const avatarUrl = await UserInforService.getFileFormFirebase(user.userProfileImage);
            return { ...user, userProfileImageUrl: avatarUrl };
          }
        })
      );

      setContactsRecommendations(updatedContacts);
    };

    fetchAvatars();
  }, [contacts]);

  const handleFollowClick = async (profileUserId) => {
    try {
      await UserInforService.followAnotherUser(userId, profileUserId);
      setUserRecommendations((prevProfiles) =>
        prevProfiles.map((user) => (user.id === profileUserId ? { ...user, followed: true } : user))
      );
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollowClick = async (profileUserId) => {
    try {
      await UserInforService.unfollowAnotherUser(userId, profileUserId);
      setUserRecommendations((prevProfiles) =>
        prevProfiles.map((user) => (user.id === profileUserId ? { ...user, followed: false } : user))
      );
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleMessageClick = (user) => {
    const tempUser = {
      friendId: Number(user.id),
      friendUsername: user.name,
      friendAvatarUrl: user.userProfileImageUrl,
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      sentByMe: false,
      lastMessageRead: true
    };

    navigate(`/chat/${tempUser.friendId}`, { state: { tempUser } });
  };

  return (
    <div className='fixed z-999 right-0 top-23 h-full w-[23%] bg-white p-4'>
      {/* Suggestion Section */}

      <div>
        {userRecommendations.length > 0 && (
          <h2 className='text-xl font-semibold text-gray-800'>{t('sidebar_right.suggest')}</h2>
        )}
        {userRecommendations.map((user) => (
          <div key={user.id} className='mt-2 space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <img
                  onClick={() => navigate(`/profile/${user.id}`)}
                  src={user.userProfileImageUrl}
                  className='w-10 h-10 rounded-full cursor-pointer'
                />
                <Link to={`/profile/${user.id}`} className='text-base cursor-pointer text-gray-700'>
                  {user.name}
                </Link>
              </div>
              {user.followed ? (
                <Button onClick={() => handleUnfollowClick(user.id)} variant='outline' className='cursor-pointer h-7'>
                  Unfollow
                </Button>
              ) : (
                <Button className='cursor-pointer h-7' onClick={() => handleFollowClick(user.id)}>
                  Follow
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      {userRecommendations.length > 0 && <hr className='my-4 border-gray-300' />}

      {/* Contacts Section */}

      <div>
        {contactsRecommendations.length > 0 && (
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold text-gray-800'>{t('sidebar_right.contact')}</h2>
            {/* <div className='flex gap-2'>
            <Search className='w-5 h-5 text-gray-600 cursor-pointer' />
            <MoreHorizontal className='w-5 h-5 text-gray-600 cursor-pointer' />
          </div> */}
          </div>
        )}

        {contactsRecommendations.map((user) => (
          <div key={user.id} className='mt-2 space-y-3'>
            <div
              onClick={() => handleMessageClick(user)}
              className='flex items-center justify-between cursor-pointer hover:bg-gray-200 rounded-md px-2 py-2'
            >
              <div className='flex items-center gap-3 relative'>
                <img src={user.userProfileImageUrl} className='w-8 h-8 rounded-full' />

                <span className='text-gray-700 text-sm'>{user.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
