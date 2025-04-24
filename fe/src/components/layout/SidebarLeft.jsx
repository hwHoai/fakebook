import { Compass, MessageSquare, Settings } from 'lucide-react';
import { useContext } from 'react';
import { UserInfoProvider } from './provider/provider';
import { DEFAULT_AVATAR_URL } from '../../constant/general';
export const SidebarLeft = () => {
  const { userAvatarUrl, userName } = useContext(UserInfoProvider);
  return (
    <div className='fixed z-999 left-0 top-18 h-full w-[23%] bg-[#f3ecfe] p-4'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-22 h-22 rounded-full overflow-hidden'>
          <img src={userAvatarUrl || DEFAULT_AVATAR_URL} alt='user_avt' className='rounded-full' />
        </div>
        <span className='text-lg font-semibold mt-1'>{userName}</span>
      </div>
      <ul className='flex flex-col h-full p-5'>
        <li>
          <button className='p-2 cursor-pointer flex items-center gap-3 w-full h-12 text-base   rounded-lg hover:bg-[#33284a] hover:text-white'>
            <Compass size={20} />
            News Feed
          </button>
        </li>

        <li>
          <button className='p-2 cursor-pointer flex items-center gap-3 w-full h-12 text-base   rounded-lg hover:bg-[#33284a] hover:text-white'>
            <MessageSquare size={20} />
            Message
          </button>
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
