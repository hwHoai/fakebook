import { Header } from '../../components/layout/Header';
import { Post } from '../../components/common/Post.jsx';
import { PostBox } from '../../components/common/PostBox.jsx';
import { SidebarRight } from '../../components/layout/SidebarRight.jsx';

export const NewFeedPage = () => {
  return (
    <div className=''>
      <Header />
      <SidebarRight />
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='mt-3'>
          <PostBox />
        </div>
        <div className='mt-10'>
          <Post />
        </div>
      </div>
    </div>
  );
};
