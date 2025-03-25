import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MediaUploader } from './MediaUploader';
import { useTranslation } from 'react-i18next';

export const PostUpload = ({ isOpen, onClose }) => {
  const [content, setContent] = useState(''); // Trạng thái nội dung bài viết
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target.id === 'popup-overlay') {
      setContent('');
      setFiles([]);
      onClose();
    }
  };

  const handleClosePopUp = () => {
    setContent('');
    setFiles([]);
    onClose();
  };

  const isPostDisabled = content.trim() === '' && files.length === 0;

  return (
    <div
      onClick={handleOverlayClick}
      id='popup-overlay'
      className='fixed inset-0 flex z-1000 items-center justify-center bg-white/70 '
    >
      <Card className='w-[500px] bg-white p-4 rounded-xl shadow-lg'>
        <div className='flex justify-between items-center border-b pb-2'>
          <h2 className='text-base font-semibold absolute left-1/2 transform -translate-x-1/2'>
            {t('post_upload.create_post')}
          </h2>
          <button onClick={handleClosePopUp} className='p-2 rounded-full hover:bg-gray-200 ml-auto'>
            <X size={20} />
          </button>
        </div>
        <CardContent className='py-4'>
          <div className='flex items-center gap-3'>
            <img src='src/assets/img/test.jpg' alt='User Avatar' className='w-10 h-10 rounded-full' />
            <div>
              <p className='font-medium text-base'>Nam Hoàng</p>
            </div>
          </div>
          <textarea
            className='w-full mt-3 p-2 border rounded-md focus:outline-none resize-none'
            rows='4'
            placeholder={t('input.placeholder')}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </CardContent>
        <div className='p-6 pt-0'>
          <MediaUploader files={files} setFiles={setFiles} />
        </div>

        <div className='flex items-center justify-between p-2 pb-0 border-t'>
          <Button className='bg-[#7940ed] w-full  text-sm' disabled={isPostDisabled}>
            {t('button.post')}
          </Button>
        </div>
      </Card>
    </div>
  );
};
