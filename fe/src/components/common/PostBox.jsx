import { useContext, useState } from 'react';
import { Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PostUpload } from '../popup/PostUpload';
import { UserInfoProvider } from '../layout/provider/provider';

export const PostBox = () => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {userAvatarUrl} = useContext(UserInfoProvider);

  return (
    <div className='w-140 bg-[#f3ecfe] p-4 rounded-2xl'>
      <div className='flex items-center gap-3'>
        {/* Avatar */}
        <img src={userAvatarUrl} alt='User Avatar' className='w-10 h-10 rounded-full' />

        {/* Input Field */}
        <div
          onClick={() => setIsPopupOpen(true)}
          className='flex-1 bg-[#ebe1fd] text-gray-600 px-4 py-2 rounded-full cursor-pointer'
        >
          {t('input.placeholder')}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-between mt-5 ml-8 text-sm text-gray-700'>
        <button onClick={() => setIsPopupOpen(true)} className='flex items-center gap-2 cursor-pointer'>
          <Video className='w-7 h-7 text-gray-500 fill-current' />
          {t('button.adding_media')}
        </button>
      </div>
      <PostUpload isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};
