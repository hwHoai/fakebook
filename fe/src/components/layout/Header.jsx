import { Link } from 'react-router';
import icon from '../../assets/img/icon.webp';
import { BRAND_NAME } from '../../constant/general';
import { Input } from '@/components/ui/input.jsx';

export const Header = () => {
  return (
    <div className='h-22 shadow flex items-center justify-center'>
      <div className='h-[80%] w-[80%] flex flex-row'>
        <Link to={'/'}>
          <img src={icon} alt='logo' height={100} className='h-full' />
        </Link>
        <div className='text-3xl px-6 text-center flex items-center text-accent-light font-medium'>{BRAND_NAME}</div>
        <Input className = 'wit'/>
      </div>
    </div>
  );
};
