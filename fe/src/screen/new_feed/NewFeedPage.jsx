import { Header } from '../../components/layout/Header';
import { Post } from '../../components/common/Post.jsx';
import { PostBox } from '../../components/common/PostBox.jsx';
import { SidebarRight } from '../../components/layout/SidebarRight.jsx';

export const NewFeedPage = () => {
  return (
    <div className=''>
      <Header />
      <SidebarRight />
      <div className='flex pt-21 flex-col justify-center items-center w-full'>
        <div className='mt-3'>
          <PostBox />
        </div>
        <div className='mt-10'>
          <Post
            media={[
              'src/assets/img/test.jpg',
              'src/assets/video/test2.mp4',
              'src/assets/img/test.jpg',
              'src/assets/img/test.jpg',
              'src/assets/img/test.jpg',
              'src/assets/img/test.jpg'
            ]}
          />
        </div>
      </div>
    </div>
  );
};
