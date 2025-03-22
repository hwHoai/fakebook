import { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';

export const Post = ({ media, onPostClick }) => {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedMedia = media.slice(0, 4); // Show only 4 items
  const extraMediaCount = media.length - 4;

  // Convert media into lightbox-compatible format
  const lightboxSlides = media.map((item) => {
    const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.webm');
    return isVideo ? { type: 'video', sources: [{ src: item, type: 'video/mp4' }] } : { src: item };
  });
  return (
    <div className='w-140 bg-[#f3ecfe] p-4 rounded-2xl'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img src='src/assets/img/test.jpg' alt='Avatar' className='w-10 h-10 rounded-full' />
          <div>
            <p className='font-bold'>Cat Babe</p>
            <p onClick={onPostClick} className='text-sm cursor-pointer text-gray-500'>
              2 {t('post.hours_ago')}
            </p>
          </div>
        </div>
        <MoreHorizontal className='text-gray-500 cursor-pointer' />
      </div>

      {/* Content */}
      <CardContent className='mt-3'>
        <p className='text-gray-700 text-sm'>
          A funny day with my sis, we was at HCM City and ate ice creams together. What a memorable day!
        </p>
        {/* Media (Images & Videos) */}
        <div className='flex gap-2 mt-3'>
          {displayedMedia.map((item, index) => {
            const isVideo = item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.webm');

            return (
              <div key={index} className='relative'>
                {isVideo ? (
                  <video
                    src={item}
                    className='w-25 h-35 rounded-xl object-cover cursor-pointer'
                    onClick={() => {
                      setCurrentIndex(index);
                      setLightboxOpen(true);
                    }}
                    muted
                    controls
                    loop
                  />
                ) : (
                  <img
                    src={item}
                    className='w-25 h-35 rounded-xl object-cover cursor-pointer'
                    onClick={() => {
                      setCurrentIndex(index);
                      setLightboxOpen(true);
                    }}
                  />
                )}

                {/* +X Overlay for Extra Media */}
                {index === 3 && extraMediaCount > 0 && (
                  <div
                    className='absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl cursor-pointer'
                    onClick={() => {
                      setCurrentIndex(3);
                      setLightboxOpen(true);
                    }}
                  >
                    <span className='text-white text-lg font-bold'>+{extraMediaCount}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Reactions */}
      <div className='flex justify-between items-center mt-4'>
        <Button
          variant='ghost'
          className='flex items-center gap-2 text-gray-600 hover:text-blue-500 cursor-pointer'
          onClick={() => setLiked(!liked)}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? 'text-blue-500' : 'text-gray-600'}`} />
          <span>114k {t('post.like')}</span>
        </Button>

        <Button
          onClick={onPostClick}
          variant='ghost'
          className='flex items-center gap-2 text-gray-600 hover:text-purple-500 cursor-pointer'
        >
          <MessageCircle className='w-5 h-5' />
          <span>1k {t('post.comment')}</span>
        </Button>

        <Button variant='ghost' className='flex items-center gap-2 text-gray-600 hover:text-green-500 cursor-pointer'>
          <Share2 className='w-5 h-5' />
          <span>{t('post.share')}</span>
        </Button>
      </div>
      {/* Lightbox with Video Support */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentIndex}
        slides={lightboxSlides}
        plugins={[Video]} // Enable video support
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { background: 'rgba(0, 0, 0, 0.8)' } // Change opacity here
        }}
      />
    </div>
  );
};
