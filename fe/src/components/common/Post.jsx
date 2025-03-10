import { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export const Post = () => {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);

  return (
    <Card className='w-150 bg-[#f3ecfe] p-4 rounded-2xl'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img src='src/assets/img/test.jpg' alt='Avatar' className='w-10 h-10 rounded-full' />
          <div>
            <p className='font-bold'>Cat Babe</p>
            <p className='text-sm text-gray-500'>2 {t('post.hours_ago')}</p>
          </div>
        </div>
        <MoreHorizontal className='text-gray-500 cursor-pointer' />
      </div>

      {/* Content */}
      <CardContent className='mt-3'>
        <p className='text-gray-700'>
          A funny day with my sis, we was at HCM City and ate ice creams together. What a memorable day!
        </p>
        {/* Images */}
        <div className='flex gap-2 mt-3'>
          <img src='src/assets/img/test.jpg' className='w-25 h-35 rounded-xl object-cover mr-2.5' />
          <img src='src/assets/img/test.jpg' className='w-25 h-35 rounded-xl object-cover mr-2.5' />
          <img src='src/assets/img/test.jpg' className='w-25 h-35 rounded-xl object-cover mr-2.5' />
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

        <Button variant='ghost' className='flex items-center gap-2 text-gray-600 hover:text-purple-500 cursor-pointer'>
          <MessageCircle className='w-5 h-5' />
          <span>1k {t('post.comment')}</span>
        </Button>

        <Button variant='ghost' className='flex items-center gap-2 text-gray-600 hover:text-green-500 cursor-pointer'>
          <Share2 className='w-5 h-5' />
          <span>{t('post.share')}</span>
        </Button>
      </div>
    </Card>
  );
};
