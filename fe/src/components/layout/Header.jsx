import { Link } from 'react-router';
import icon from '../../assets/img/icon.webp';
import { BRAND_NAME } from '../../constant/general';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useCallback, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export const Header = () => {
  const [searchValue, setSearchValue] = useState('');
  const isLogin = false;
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue('');
    console.log(searchValue);
  };

  const handleChangeInput = useCallback((value) => {
    setSearchValue(() => {
      return value;
    });
  }, []);
  return (
    <div className='h-18 shadow flex items-center justify-around py-3'>
      <Link to={'/'} className='flex items-center'>
        <img src={icon} alt='logo' height={100} width={100} className='h-12 w-12 grow' />
        <div className='text-2xl px-3 text-center text-accent-light font-medium inline-block'>{BRAND_NAME}</div>
      </Link>
      <div className='relative'>
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
          />
          <div className='absolute right-0 top-[50%] translate-y-[-50%] '>
            <hr className='absolute w-[2px] h-[60%] bg-black left-0 top-[50%] translate-y-[-50%] opacity-30' />

            <Button
              variant='ghost'
              type='submit'
              className='opacity-30 hover:opacity-60 hover:cursor-pointer hover:bg-inherit inline-block h-full'
            >
              <Search className='!size-7' />
            </Button>
          </div>
        </form>
      </div>
      {isLogin ? (
        <></>
      ) : (
        <div className='flex gap-5'>
          <Button
            variant={'outline'}
            className='px-5 rounded-xl py-2 border-2 border-secondary-light hover:bg-secondary-light hover:text-white-text hover:cursor-pointer'
          >
            {t('general.Sign_Up')}
          </Button>
          <Button className='px-5 rounded-xl py-2 text-black-text bg-primary-light hover:bg-secondary-light hover:text-white-text hover:cursor-pointer'>
            {t('general.Log_In')}
          </Button>
        </div>
      )}
    </div>
  );
};
