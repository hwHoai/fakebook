import { Link } from 'react-router';
import icon from '../../assets/img/icon.webp';
import { BRAND_NAME } from '../../constant/general';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useCallback, useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, MessageSquare, Bell, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { UserMenu } from '../popup/UserMenu';
import { AuthProvider, UserInfoProvider } from './provider/provider';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { UserInforService } from '../../service/user/userInforService';
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from '../../constant/general';
import imgTest from '../../assets/img/test.jpg';

export const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { isAuth } = useContext(AuthProvider);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { t } = useTranslation();
  const profileButtonRef = useRef(null);
  const { userPublicInfo } = useContext(UserInfoProvider);
  const suggestionBoxRef = useRef(null);
  const navigate = useNavigate();
  const [userSuggestions, setUserSuggestions] = useState([]);
  const { results: suggestions } = useSearchUsers(searchValue);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      navigate(`/search?query=${searchValue}`);
      setSearchValue('');
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const updatedSuggestions = await Promise.all(
        suggestions.map(async (user) => {
          if (user.avatar === DEFAULT_AVATAR_FILENAME || user.avatar === null) {
            return { ...user, userProfileImageUrl: DEFAULT_AVATAR_URL };
          } else {
            const avatarUrl = await UserInforService.getFileFormFirebase(user.userProfileImage);
            return { ...user, userProfileImageUrl: avatarUrl };
          }
        })
      );

      setUserSuggestions(updatedSuggestions);
    };

    fetchAvatars();
  }, [suggestions]);

  const handleChangeInput = useCallback((value) => {
    setSearchValue(() => value);
    setSelectedIndex(-1);
  }, []);

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) =>
        prevIndex === -1 ? suggestions.length - 1 : (prevIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === 'Enter') {
      if (selectedIndex !== -1) {
        // Navigate to the selected suggestion
        const selectedUser = suggestions[selectedIndex];
        navigate(`/profile/${selectedUser.id}`);
        setSearchValue('');
      } else if (searchValue.trim()) {
        // Navigate to /search with query
        navigate(`/search?query=${searchValue}`);
        setSearchValue('');
      }
    }
  };

  const handleClickOutside = (e) => {
    if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(e.target)) {
      setSearchValue(''); // Hide suggestions when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='h-18 bg-white z-1000 fixed right-0 left-0 shadow flex items-center justify-around py-3'>
      <Link to={'/'} className='flex items-center'>
        <img src={icon} alt='logo' height={100} width={100} className='h-12 w-12 grow' />
        <div className='text-2xl px-3 text-center text-accent-light font-medium inline-block'>{BRAND_NAME}</div>
      </Link>

      {/* Search */}
      <div className='relative' ref={suggestionBoxRef}>
        <form
          onSubmit={(e) => {
            handleSearch(e);
          }}
        >
          <Input
            onInput={(e) => {
              handleChangeInput(e.target.value);
            }}
            value={searchValue}
            placeholder='Search on fakebook'
            className='w-3xl h-12 bg-primary-light font-[500] border-none rounded-2xl focus:border-none focus-visible:ring-0'
            onKeyDown={handleKeyDown} // Handle keyboard navigation
          />
          <div className='absolute right-0 top-[50%] translate-y-[-50%] '>
            <hr className='absolute w-[2px] h-[60%] bg-black left-0 top-[50%] translate-y-[-50%] opacity-30' />

            <Button
              variant='ghost'
              type='submit'
              className='opacity-30 hover:opacity-60 hover:cursor-pointer hover:bg-inherit inline-block h-full'
              onClick={handleSearch}
            >
              <Search className='!size-7' />
            </Button>
          </div>
        </form>
        {searchValue && userSuggestions.length > 0 && (
          <div className='absolute p-2.5 top-full mt-1 bg-white shadow rounded-md w-180 z-50'>
            {userSuggestions.map((user, index) => (
              <Link
                key={user.id}
                to={`/profile/${user.id}`}
                className={`flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl ${
                  index === selectedIndex ? 'bg-gray-200' : ''
                }`}
                onClick={() => setSearchValue('')}
              >
                <img src={user.userProfileImageUrl} alt={user.name} className='w-8 h-8 rounded-full object-cover' />
                <span className='text-sm'>{user.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {isAuth ? (
        <div className='flex gap-4'>
          {/* Chat Button */}
          <Link to='/chat' className='p-3 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200'>
            <MessageSquare className='w-5 h-5 text-gray-700' />
          </Link>

          {/* Notification Button */}
          {/* <div className='relative'>
            <button className='p-3 cursor-pointer bg-gray-100 rounded-full hover:bg-gray-200'>
              <Bell className='w-5 h-5 text-gray-700' />
            </button>
            <span className='absolute bottom-1 cursor-pointer right-0 translate-x-1/3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
              1
            </span>
          </div> */}

          {/* Profile Button */}
          <div
            ref={profileButtonRef}
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from propagating to the document
              setIsUserMenuOpen((prev) => !prev); // Toggle the menu
            }}
            className='relative cursor-pointer w-11 h-11'
          >
            <img src={userPublicInfo.userAvatarUrl} alt='Profile' className='w-full h-full rounded-full object-cover' />
            <ChevronDown className='absolute bottom-1 right-0 translate-x-1/3 bg-gray-100 p-1 rounded-full shadow-md w-5 h-5 text-gray-700' />
            <UserMenu
              isOpen={isUserMenuOpen}
              onClose={() => setIsUserMenuOpen(false)}
              profileButtonRef={profileButtonRef}
            />
          </div>
        </div>
      ) : (
        <div className='flex gap-5'>
          <Link to='/register'>
            <Button
              variant={'outline'}
              className='px-5 rounded-xl py-2 border-2 border-secondary-light hover:bg-secondary-light hover:text-white-text hover:cursor-pointer'
            >
              {t('general.Sign_Up')}
            </Button>
          </Link>
          <Link to='/login'>
            <Button className='px-5 rounded-xl py-2 text-black-text bg-primary-light hover:bg-secondary-light hover:text-white-text hover:cursor-pointer'>
              {t('general.Log_In')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
