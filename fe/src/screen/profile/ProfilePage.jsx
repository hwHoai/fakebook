import { Camera } from 'lucide-react';
import { useState, useRef } from 'react';
import { useParams } from 'react-router';
import { Header } from '../../components/layout/Header';
import { PostBox } from '../../components/common/PostBox';
import { useEffect } from 'react';
import { TokenService } from '../../util/tokenService';
import { CookieService } from '../../util/cookieService';
import { FeedService } from '../../service/feed/feedService';
import { Post } from '../../components/common/Post';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserInforService } from '../../service/user/userInforService';
import { DEFAULT_AVATAR_URL, DEFAULT_AVATAR_FILENAME } from '../../constant/general';
export const ProfilePage = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const authToken = CookieService.getCookie('accessToken');
  const { userId } = TokenService.decodeToken(authToken) || {};
  const [postList, setPostList] = useState([]);
  const fileInputRef = useRef(null);
  const { profileUserId } = useParams();
  const [isFollowed, setIsFollowed] = useState();
  const [userProfileInfo, setUserProfileInfo] = useState({
    userName: '',
    userEmail: '',
    phoneNumber: '',
    userProfileImage: DEFAULT_AVATAR_FILENAME
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFollowClick = async () => {
    const request = await UserInforService.followAnotherUser(userId, profileUserId);

    setIsFollowed(!isFollowed);
  };
  const handleUnfollowClick = async () => {
    const request = await UserInforService.unfollowAnotherUser(userId, profileUserId);
    setIsFollowed(!isFollowed);
  };
  useEffect(() => {
    (async () => {
      const newPost = await FeedService.getUserFeed(profileUserId).then((res) => {
        return postList.concat(res);
      });

      setPostList(newPost);
      // if (postList.length > 50) {
      //   const newPost = await FeedService.getNewFeed(userId);
      //   setPostList(newPost);
      // }
    })();
  }, []);

  useEffect(() => {
    try {
      const request = UserInforService.getPublicUserInfo(profileUserId);
      request.then((userInfo) => {
        if (userInfo.userProfileImage == DEFAULT_AVATAR_FILENAME) {
          setUserProfileInfo({ ...userInfo, userProfileImage: DEFAULT_AVATAR_URL });
        } else {
          const avatarUrl = UserInforService.getFileFormFirebase(userInfo.userProfileImage);
          setUserProfileInfo({ ...userInfo, userProfileImage: avatarUrl });
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  }, [profileUserId]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const isFollowing = await UserInforService.checkIfUserIsFollowing(userId, profileUserId);
        console.log('isFollowing', isFollowing);
        setIsFollowed(isFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    checkFollowStatus();
  }, [userId, profileUserId]);

  return (
    <div className='max-w-screen max-h-screen'>
      <Header />
      <div className='pt-18 px-45 '>
        <div className='relative w-full rounded-sm h-55 bg-[#f3ecfe]'>
          {/* <div className='absolute inset-0 bg-cover bg-center'></div> */}
        </div>

        <div className='relative w-full px-10 pb-4 border-b-1 flex  -mt-10'>
          <div className='relative  min-w-32 min-h-32'>
            <img
              src={userProfileInfo.userProfileImage}
              className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-md'
              alt='avatar'
            />
            <div
              className='absolute bottom-0 right-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow cursor-pointer'
              onClick={handleIconClick}
            >
              <Camera className='w-5 h-5 text-gray-600' />
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div className='mt-15 ml-3  w-full flex justify-between'>
            <div className='flex  flex-col'>
              <span className='block text-xl font-semibold'>{userProfileInfo.userName}</span>
              <div className='flex gap-1 mt-1'>
                <div className='text-sm text-gray-500'>0 posts</div>
                <div className='text-sm text-gray-500'>2 followers</div>
              </div>
            </div>
            <div className=''>
              {userId !== Number(profileUserId) ? (
                <>
                  {isFollowed ? (
                    <Button variant='outline' onClick={handleUnfollowClick} className='cursor-pointer mr-2.5'>
                      Unfollow
                    </Button>
                  ) : (
                    <Button onClick={handleFollowClick} className='cursor-pointer mr-2.5'>
                      Follow
                    </Button>
                  )}
                  <Button variant='outline' className='cursor-pointer'>
                    <MessageSquare className='w-4 h-4 mr-0.5' />
                    Message
                  </Button>
                </>
              ) : (
                <Button variant='outline' className='cursor-pointer'>
                  <MessageSquare className='w-4 h-4 mr-0.5' />
                  View Messages
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* {imageSrc && <AvtChosen imageSrc={imageSrc} />} */}
        <div className='mt-5 w-full flex flex-col gap-5 items-center'>
          {userId === Number(profileUserId) && <PostBox />}

          {postList.map((post, index) => (
            <div key={index}>
              <Post postArgs={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
