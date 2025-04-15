import { useState, useEffect } from 'react';
import { Header } from '../../components/layout/Header';
import { Post } from '../../components/common/Post.jsx';
import { PostBox } from '../../components/common/PostBox.jsx';
import { SidebarRight } from '../../components/layout/SidebarRight.jsx';
import { SidebarLeft } from '../../components/layout/SidebarLeft.jsx';
import { PostDetail } from '../../components/popup/PostDetail.jsx';

export const NewFeedPage = () => {
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    if (showPostDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showPostDetail]);

  return (
    <div className=''>
      <Header />
      <SidebarRight />
      <SidebarLeft />
      <div className='flex pt-21 flex-col justify-center items-center w-full'>
        <div className='mt-3'>
          <PostBox />
        </div>
        <div className='mt-10 flex flex-col gap-10'>
          <Post
            media={['src/assets/img/test.jpg', 'src/assets/img/test.jpg', 'src/assets/img/test.jpg']}
            onPostClick={() =>
              handlePostClick({
                media: ['src/assets/img/test.jpg', 'src/assets/img/test.jpg', 'src/assets/img/test.jpg']
              })
            }
          />

          <Post
            media={[
              'src/assets/img/test.jpg',
              'src/assets/video/test2.mp4',
              'src/assets/img/test.jpg',
              'src/assets/img/test.jpg',
              'src/assets/img/test.jpg',
              'src/assets/img/test.jpg'
            ]}
            onPostClick={() =>
              handlePostClick({
                media: [
                  'src/assets/img/test.jpg',
                  'src/assets/video/test2.mp4',
                  'src/assets/img/test.jpg',
                  'src/assets/img/test.jpg',
                  'src/assets/img/test.jpg',
                  'src/assets/img/test.jpg'
                ]
              })
            }
          />
        </div>
      </div>
      {showPostDetail && <PostDetail onClosePostDetail={() => handleClosePostDetail()} post={selectedPost} />}
    </div>
  );
};
