import { Compass, MessageSquare, Settings } from 'lucide-react';
import { useContext } from 'react';
import { UserInfoProvider } from './provider/provider';
import { DEFAULT_AVATAR_URL } from '../../constant/general';
import { Link } from 'react-router';
import { CookieService } from '../../util/cookieService';
import { TokenService } from '../../util/tokenService';

export const SidebarLeft = () => {
  const { userPublicInfo } = useContext(UserInfoProvider);

  const token = CookieService.getCookie('accessToken');
  let currentUserId = null;
  if (token) {
    const decodedToken = TokenService.decodeToken(token);
    currentUserId = decodedToken.userId;
  }
  return (
    <div className='fixed z-999 left-0 top-18 h-full w-[23%] bg-[#f3ecfe] p-4'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-22 h-22 rounded-full overflow-hidden'>
          <img src={userPublicInfo.userAvatarUrl || DEFAULT_AVATAR_URL} alt='user_avt' className='rounded-full' />
        </div>
        <span className='text-lg font-semibold mt-1'>{userPublicInfo.userName}</span>
      </div>
      <ul className='flex flex-col h-full p-5'>
        <li>
          <Link
            to={`/profile/${currentUserId}`}
            className='p-2 cursor-pointer flex items-center gap-3 w-full h-12 text-base   rounded-lg hover:bg-[#33284a] hover:text-white'
          >
            <Compass size={20} />
            Profile
          </Link>
        </li>

        <li>
          <Link
            to='/chat'
            className='p-2 cursor-pointer flex items-center gap-3 w-full h-12 text-base   rounded-lg hover:bg-[#33284a] hover:text-white'
          >
            <MessageSquare size={20} />
            Message
          </Link>
        </li>

        <li>
          <button className='p-2 cursor-pointer flex items-center gap-3 w-full h-12 text-base   rounded-lg hover:bg-[#33284a] hover:text-white'>
            <Settings size={20} />
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};
