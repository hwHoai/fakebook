import { useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MediaUploader } from '../common/MediaUploader';
import { useTranslation } from 'react-i18next';
import { UserInfoProvider } from '../layout/provider/provider';
import { CookieService } from '../../util/cookieService';
import { TokenService } from '../../util/tokenService';
import { FeedService } from '../../service/feed/feedService';
import { firebaseStorage } from '../../config/firebaseStorage';
import { ref, uploadBytes, uploadString } from 'firebase/storage';

// eslint-disable-next-line react/prop-types
export const PostUpload = ({ isOpen, onClose }) => {
  const [content, setContent] = useState(''); // Trạng thái nội dung bài viết
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();
  const { userAvatarUrl, userName } = useContext(UserInfoProvider);
  const authToken = CookieService.getCookie('accessToken');
  const { userId } = TokenService.decodeToken(authToken);
  const [formData, setFormData] = useState({
    userId: userId,
    caption: '',
    listImageString: '',
    createAt: '',
    updateAt: ''
  });

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        caption: content,
        listImageString: files
          .map((file) => {
            return file.url.split('/').slice(-1)[0];
          })
          .join('___'),
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString()
      };
    });
  }, [files, content]);

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

  const handlePost = async () => {
    try {
      // Upload new feed to the server
      console.log('Posting:', formData);
      const createFeedResponse = await FeedService.createNewFeed(formData);
      if (!createFeedResponse) {
        console.warn('Post failed');
        return;
      }

      // Upload files to Firebase Storage
      files.forEach((file) => {
        (async () => {
          if (file.url.startsWith('blob:')) {
            const image = await fetch(file.url).then((res) => res.blob());
            const imageRef = ref(
              firebaseStorage,
              `images/${userId}/${formData.listImageString}/${file.url.split('/').slice(-1)[0]}`
            );
            uploadBytes(imageRef, image).then((snapshot) => {
              console.log('Uploaded a blob or file!', snapshot);
            });
          }
          if (file.url.startsWith('data:')) {
            const imageRef = ref(
              firebaseStorage,
              `images/${userId}/${formData.listImageString}/${file.url.split('/').slice(-1)[0]}.jpg`
            );
            uploadString(imageRef, file.url).then((snapshot) => {
              console.log('Uploaded a blob or file!', snapshot);
            });
          }
        })()
      })

      console.log('All files uploaded successfully!');

      // Clear form and close popup
      setContent('');
      setFiles([]);
      onClose();
    } catch (error) {
      console.error('Error while posting:', error);
      alert(`Failed to post: ${error.message}`);
      // Don't throw the error here - handle it gracefully
    }
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
            <img src={userAvatarUrl} alt='User Avatar' className='w-10 h-10 rounded-full' />
            <div>
              <p className='font-medium text-base'>{userName}</p>
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
          <Button onClick={handlePost} className='bg-[#7940ed] w-full  text-sm' disabled={isPostDisabled}>
            {t('button.post')}
          </Button>
        </div>
      </Card>
    </div>
  );
};
