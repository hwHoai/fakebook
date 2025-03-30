import { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { CookieService } from '../../util/cookieService';

export const UserMenu = ({ isOpen, onClose, profileButtonRef }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, profileButtonRef]);

  const handleLogout = () => {
    CookieService.removeCookie('accessToken');
    CookieService.removeCookie('refreshToken');
    window.location.reload();
  };

  if (!isOpen) return null;

  return (
    <Card ref={menuRef} className='absolute right-0 top-12 w-65 p-2 rounded-lg z-50'>
      <ul className=''>
        <li className='px-2 border-b-2 flex items-center rounded-lg py-2 hover:bg-gray-100 cursor-pointer'>
          <img src='src/assets/img/test.jpg' alt='User Avatar' className='w-7 h-7 rounded-full mr-2' />
          <span className='text-sm font-semibold'>Nam Hoàng</span>
        </li>
        <li className='px-2 rounded-lg py-2 hover:bg-gray-100 cursor-pointer'>Settings</li>
        <li onClick={handleLogout} className='px-2 rounded-lg py-2 hover:bg-gray-100 cursor-pointer'>
          Logout
        </li>
      </ul>
    </Card>
  );
};
