import { Card } from '@/components/ui/card';
import { Link } from 'react-router';

export const ProfilePanel = ({ friendName, friendAvatarUrl, friendId }) => {
  return (
    <Card className='w-1/4 bg-[#f3ecfe] flex flex-col items-center  p-5 m-4 border-l'>
      <img src={friendAvatarUrl} alt='avt' className='rounded-full w-22 h-22' />
      <h2 className='font-bold mt-3 text-lg'>{friendName}</h2>
      {/* <p className='text-gray-500'>@Begay123</p> */}
      <Link to={`/profile/${friendId}`} className='bg-[#e4d7ff] cursor-pointer px-4 py-2 rounded-full mt-2'>
        Profile
      </Link>
    </Card>
  );
};
