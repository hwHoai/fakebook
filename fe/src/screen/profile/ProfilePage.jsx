import { Camera } from 'lucide-react';
import { useState, useRef, useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import { Header } from '../../components/layout/Header';
import { PostBox } from '../../components/common/PostBox';
import { useEffect } from 'react';
import { TokenService } from '../../util/tokenService';
import { CookieService } from '../../util/cookieService';
import { FeedService } from '../../service/server/feed/feedService';
import { Post } from '../../components/common/Post';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserInforService } from '../../service/user/userInforService';
import { useNavigate, Link } from 'react-router';
import { UserInfoProvider } from '../../components/layout/provider/provider';
export const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useLocation().pathname.split('/')[2];
  const [postList, setPostList] = useState([]);
  const fileInputRef = useRef(null);
  const { profileUserId } = useParams();
  const [isFollowed, setIsFollowed] = useState();
  const { userPublicInfo, dispatch } = useContext(UserInfoProvider);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imgRef = URL.createObjectURL(file);

    if (file) {
      // Upload the image to Firebase Storage
      const storageRef = `images/${userId}/avatar/${file.name}`;
      await UserInforService.uploadImageToFirebase(storageRef, imgRef);
      console.log('imgRef', typeof file.name);
      await UserInforService.updateUserAvatar(userId, file.name);
      const avatarUrl = await UserInforService.getFileFormFirebase(storageRef);
      console.log('avatarUrl', avatarUrl);
      dispatch({
        type: 'SET_USER_AVATAR_URL',
        payload: {
          userAvatarUrl: avatarUrl
        }
      });
      dispatch({
        type: 'SET_USER_AVATAR',
        payload: {
          userAvatar: file.name
        }
      });
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleMessageClick = () => {
    const tempUser = {
      friendId: Number(profileUserId),
      friendUsername: userPublicInfo.userName,
      friendAvatarUrl: userPublicInfo.userProfileImage,
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      sentByMe: false,
      lastMessageRead: true
    };

    navigate(`/chat/${tempUser.friendId}`, { state: { tempUser } });
  };

  const handleFollowClick = async () => {
    await UserInforService.followAnotherUser(userId, profileUserId);

    setIsFollowed(!isFollowed);
  };
  const handleUnfollowClick = async () => {
    await UserInforService.unfollowAnotherUser(userId, profileUserId);
    setIsFollowed(!isFollowed);
  };
  useEffect(() => {
    (async () => {
      const newPost = await FeedService.getUserFeed(profileUserId).then((res) => {
        console.log('res', res);
        return res;
      });

      setPostList(newPost);
      console.log('newPost', newPost);
    })();
  }, []);

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostList([]);

        const newPost = await FeedService.getUserFeed(profileUserId);
        setPostList(newPost);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [profileUserId]);
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
              src={userPublicInfo.userAvatarUrl}
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
              <span className='block text-xl font-semibold'>{userPublicInfo.userName}</span>
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
                  <Button onClick={handleMessageClick} variant='outline' className='cursor-pointer'>
                    <MessageSquare className='w-4 h-4 mr-0.5' />
                    Message
                  </Button>
                </>
              ) : (
                <Link to='/chat' className='cursor-pointer'>
                  <Button variant='outline' className='cursor-pointer'>
                    <MessageSquare className='w-4 h-4 mr-0.5' />
                    View Messages
                  </Button>
                </Link>
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
