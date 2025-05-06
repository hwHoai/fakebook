import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Header } from '../../components/layout/Header';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router';
import { useSearchUserProfile } from '../../hooks/useSearchUserProfile';
import { TokenService } from '../../util/tokenService';
import { CookieService } from '../../util/cookieService';
import { UserInforService } from '../../service/user/userInforService';
import { DEFAULT_AVATAR_URL, DEFAULT_AVATAR_FILENAME } from '../../constant/general';

export const SearchResultPage = () => {
  const navigate = useNavigate();
  const authToken = CookieService.getCookie('accessToken');
  const { userId } = TokenService.decodeToken(authToken) || {};
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const { results } = useSearchUserProfile(query, userId);
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const filteredResults = results.filter((user) => user.id !== userId);

      const updatedProfiles = await Promise.all(
        filteredResults.map(async (user) => {
          if (user.avatar === DEFAULT_AVATAR_FILENAME || user.avatar === null) {
            return { ...user, userProfileImageUrl: DEFAULT_AVATAR_URL };
          } else {
            const avatarUrl = await UserInforService.getFileFormFirebase(user.userProfileImage);
            return { ...user, userProfileImageUrl: avatarUrl };
          }
        })
      );

      setUserProfiles(updatedProfiles);
    };

    fetchAvatars();
  }, [results, userId]);

  const handleFollowClick = async (profileUserId) => {
    try {
      await UserInforService.followAnotherUser(userId, profileUserId);
      setUserProfiles((prevProfiles) =>
        prevProfiles.map((user) => (user.id === profileUserId ? { ...user, followed: true } : user))
      );
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollowClick = async (profileUserId) => {
    try {
      await UserInforService.unfollowAnotherUser(userId, profileUserId);
      setUserProfiles((prevProfiles) =>
        prevProfiles.map((user) => (user.id === profileUserId ? { ...user, followed: false } : user))
      );
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='flex pt-21 flex-col justify-center items-center w-full z-40'>
        <div className='w-160 '>
          <div className='text-sm w-full  p-4 rounded-sm'>
            Search result for <span className='text-blue-400'>'{query}'</span>
          </div>
          <div className='flex flex-col gap-4 mt-3'>
            {userProfiles.map((user) => (
              <div key={user.id} className='flex w-full bg-[#f3ecfe] p-4 rounded-2xl items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <img
                    onClick={() => navigate(`/profile/${user.id}`)}
                    src={user.userProfileImageUrl}
                    alt='Avatar'
                    className='rounded-full w-11 h-11 cursor-pointer'
                  />
                  <Link to={`/profile/${user.id}`} className='cursor-pointer'>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
