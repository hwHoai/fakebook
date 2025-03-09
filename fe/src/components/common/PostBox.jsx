import { Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PostBox = () => {
  const { t } = useTranslation();
  return (
    <div className='w-150 bg-[#f3ecfe] p-4 rounded-2xl'>
      <div className='flex items-center gap-3'>
        {/* Avatar */}
        <img src='src/assets/img/test.jpg' alt='User Avatar' className='w-10 h-10 rounded-full' />

        {/* Input Field */}
        <div className='flex-1 bg-[#ebe1fd] text-gray-600 px-4 py-2 rounded-full cursor-pointer'>
          {t('post_box.placeholder')}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-between mt-5 ml-8 text-sm text-gray-700'>
        <button className='flex items-center gap-2'>
          <Video className='w-7 h-7 text-gray-500 fill-current' />
          {t('button.adding_media')}
        </button>
      </div>
    </div>
  );
};
