import { Send } from 'lucide-react';

export const CommentBox = () => {
  return (
    <div className='flex items-center gap-2 p-4 py-2 bg-[#f3ecfe]  w-full '>
      {/* Profile Image */}
      <img src='src/assets/img/test.jpg' alt='User Avatar' className='w-9 h-9 rounded-full' />

      <div className='flex-1 relative'>
        <input
          type='text'
          placeholder='Write a public comment...'
          className='w-full p-2 pl-4 pr-12 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7940ed] placeholder:text-sm placeholder:text-gray-400'
        />

        <button className='absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
          <Send className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};
