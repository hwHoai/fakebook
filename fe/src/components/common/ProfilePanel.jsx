import { Card } from '@/components/ui/card';

export const ProfilePanel = () => {
  return (
    <Card className='w-1/4 bg-[#f3ecfe] flex flex-col items-center  p-5 m-4 border-l'>
      <img src='src/assets/img/test.jpg' alt='avt' className='rounded-full w-22 h-22' />
      <h2 className='font-bold mt-3 text-lg'>Le Trong Vinh</h2>
      {/* <p className='text-gray-500'>@Begay123</p> */}
      <button className='bg-[#e4d7ff] cursor-pointer px-4 py-2 rounded-full mt-2'>Profile</button>
    </Card>
  );
};
