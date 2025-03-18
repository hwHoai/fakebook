import { useState } from 'react';
import { Image, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';

export const MediaUploader = ({ files, setFiles }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1); // Index ảnh đang xem trong Lightbox
  const { t } = useTranslation();

  // Xử lý khi chọn file
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const newFiles = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image'
    }));

    setFiles([...files, ...newFiles]);

    event.target.value = '';
  };

  // Xóa ảnh/video khỏi danh sách
  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className='max-w-2xl mx-auto'>
      {/* Input chọn file */}
      <label className='border rounded-md p-3  flex justify-center items-center cursor-pointer hover:bg-gray-100'>
        <Image size={24} className='text-gray-500' />
        <span className='ml-2 text-sm text-gray-600'>{t('button.adding_media')}</span>
        <input type='file' accept='image/*,video/*' multiple onChange={handleFileChange} className='hidden' />
      </label>

      {/* Hiển thị danh sách ảnh/video */}
      <div className='grid grid-cols-3 gap-2 mt-2 max-h-56 overflow-y-auto'>
        {files.map((file, index) => (
          <div key={index} className='relative cursor-pointer group'>
            {file.type === 'image' ? (
              <img
                src={file.url}
                alt={`Uploaded ${index}`}
                className='w-full h-24 object-cover rounded-lg'
                onClick={() => setLightboxIndex(index)}
              />
            ) : (
              <video
                src={file.url}
                className='w-full h-24 object-cover rounded-lg'
                controls
                onClick={() => setLightboxIndex(index)}
              />
            )}
            {/* Nút Xóa */}
            <button
              className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer'
              onClick={() => handleRemoveFile(index)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox hỗ trợ cả ảnh và video */}
      {lightboxIndex >= 0 && (
        <Lightbox
          slides={files.map((file) => ({
            type: file.type === 'video' ? 'video' : 'image',
            src: file.url,
            ...(file.type === 'video' && { sources: [{ src: file.url, type: 'video/mp4' }] })
          }))}
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          plugins={[Video]}
          controller={{ closeOnBackdropClick: true }}
          on={{ view: ({ index }) => setLightboxIndex(index) }}
          styles={{
            container: { background: 'rgba(0, 0, 0, 0.8)' } // Change opacity here
          }}
        />
      )}
    </div>
  );
};
