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
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from '../../constant/general';
import { Loader } from 'lucide-react';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const fileInputRef = useRef(null);
  const { profileUserId } = useParams();
  const [isFollowed, setIsFollowed] = useState();
  const { userPublicInfo, dispatch } = useContext(UserInfoProvider);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);
  const [userProfileInfo, setUserProfileInfo] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    phoneNumber: '',
    userAvatar: DEFAULT_AVATAR_FILENAME,
    userAvatarUrl: DEFAULT_AVATAR_URL
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const profileInfo = await UserInforService.getPublicUserInfo(profileUserId || userPublicInfo.userId);
        const profileAvatarUrl = await UserInforService.getFileFormFirebase(
          `images/${profileInfo.userId}/avatar/${profileInfo.userProfileImage}`
        );
        if (profileInfo) {
          setUserProfileInfo({
            userId: profileInfo.userId,
            userName: profileInfo.userName,
            userEmail: profileInfo.userEmail,
            phoneNumber: profileInfo.phoneNumber,
            userAvatar: profileInfo.userProfileImage || DEFAULT_AVATAR_FILENAME,
          });
        }
        if(profileAvatarUrl) {
          setUserProfileInfo((prev) => ({
            ...prev,
            userAvatarUrl: profileAvatarUrl
          }));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchUserProfile();
  }, [profileUserId, userPublicInfo.userId])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imgRef = URL.createObjectURL(file);

    if (file) {
      // Upload the image to Firebase Storage
      const storageRef = `images/${userPublicInfo.userId}/avatar/${file.name}`;
      await UserInforService.uploadImageToFirebase(storageRef, imgRef);
      console.log('imgRef', typeof file.name);
      await UserInforService.updateUserAvatar(userPublicInfo.userId, file.name);
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
    setIsLoadingFollow(true);
    try {
      await UserInforService.followAnotherUser(userPublicInfo.userId, profileUserId);
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setIsLoadingFollow(false);
    }
  };

  const handleUnfollowClick = async () => {
    setIsLoadingFollow(true);
    try {
      await UserInforService.unfollowAnotherUser(userPublicInfo.userId, profileUserId);
      setIsFollowed(!isFollowed);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    } finally {
      setIsLoadingFollow(false);
    }
  };

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const isFollowing = await UserInforService.checkIfUserIsFollowing(userPublicInfo.userId, profileUserId);
        console.log('isFollowing', isFollowing);
        setIsFollowed(isFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    if (userPublicInfo.userId && profileUserId) {
      checkFollowStatus();
    }
  }, [userPublicInfo.userId, profileUserId]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!profileUserId) return;

      setIsLoadingPosts(true);
      try {
        setPostList([]);
        const newPost = await FeedService.getUserFeed(profileUserId);
        setPostList(newPost);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoadingPosts(false);
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

        {isLoadingProfile ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className='relative w-full px-10 pb-4 border-b-1 flex -mt-10'>
            <div className='relative  min-w-32 min-h-32'>
              <img
                src={
                  userPublicInfo.userId === Number(profileUserId)
                    ? userPublicInfo.userAvatarUrl
                    : userProfileInfo.userAvatarUrl
                }
                className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-md'
                alt='avatar'
              />
              {userPublicInfo.userId === Number(profileUserId) && (
                <div
                  className='absolute bottom-0 right-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shadow cursor-pointer'
                  onClick={handleIconClick}
                >
                  <Camera className='w-5 h-5 text-gray-600' />
                </div>
              )}
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
                  <div className='text-sm text-gray-500'>{postList.length} posts</div>
                  <div className='text-sm text-gray-500'>2 followers</div>
                </div>
              </div>
              <div className=''>
                {userPublicInfo.userId !== Number(profileUserId) ? (
                  <>
                    {isFollowed ? (
                      <Button 
                        variant='outline' 
                        onClick={handleUnfollowClick} 
                        className='cursor-pointer mr-2.5'
                        disabled={isLoadingFollow}
                      >
                        {isLoadingFollow ? <Loader className="h-4 w-4 animate-spin" /> : 'Unfollow'}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleFollowClick} 
                        className='cursor-pointer mr-2.5'
                        disabled={isLoadingFollow}
                      >
                        {isLoadingFollow ? <Loader className="h-4 w-4 animate-spin" /> : 'Follow'}
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
        )}

        <div className='mt-5 w-full flex flex-col gap-5 items-center'>
          {userPublicInfo.userId === Number(profileUserId) && <PostBox />}

          {isLoadingPosts ? (
            <div className="flex justify-center items-center py-8">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : postList.length > 0 ? (
            postList.map((post, index) => (
              <div key={index}>
                <Post postArgs={post} />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No posts to display
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
