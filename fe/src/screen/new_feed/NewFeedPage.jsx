import { useState, useEffect, useContext, useCallback } from 'react';
import { Post } from '../../components/common/Post.jsx';
import { PostBox } from '../../components/common/PostBox.jsx';
import { PostDetail } from '../../components/popup/PostDetail.jsx';
import { AuthProvider } from '../../components/layout/provider/provider.js';
import { FeedService } from '../../service/feed/feedService.js';
import { TokenService } from '../../util/tokenService.js';
import { CookieService } from '../../util/cookieService.js';
import { Header } from '../../components/layout/Header.jsx';
import { SidebarRight } from '../../components/layout/SidebarRight.jsx';
import { SidebarLeft } from '../../components/layout/SidebarLeft.jsx';
import { Loading } from '../../components/common/Loading.jsx';

export const NewFeedPage = () => {
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isAuth } = useContext(AuthProvider);
  const authToken = CookieService.getCookie('accessToken');
  const { userId } = TokenService.decodeToken(authToken) || {};
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);


  const handlePostClick = useCallback((post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  }, [setSelectedPost, setShowPostDetail]);

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

  useEffect(() => {
    console.log('isAuth', isAuth);
    (async () => {
      const newPost = await isAuth
        ? await FeedService.getNewFeed(userId).then((res) => {
            return postList.concat(res);
          })
        : await FeedService.getNewFeedForGuest();
      setPostList(newPost);
      if (postList.length > 50) {
        const newPost = await FeedService.getNewFeed(userId);
        setPostList(newPost);
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    })();
  }, []);

  return (
    <div className={`${loading ? ' overflow-hidden max-w-screen max-h-screen' : ''}`}>
      {loading && <div className='fixed bg-accent-light w-full h-full z-[9999]'><Loading/></div>}
      {
        <>
          <Header />
          <SidebarRight />
          <SidebarLeft />
          <div className='flex pt-21 flex-col justify-center items-center w-full z-40'>
            {isAuth && (
              <div className='mt-3'>
                <PostBox />
              </div>
            )}
            <div className='mt-10 flex flex-col gap-10'>
              {postList.map((post, index) => (
                <div key={index}>
                  <Post postArgs={post} onClick={() => handlePostClick(post)} />
                </div>
              ))}
            </div>
          </div>
          {showPostDetail && <PostDetail onClosePostDetail={() => handleClosePostDetail()} post={selectedPost} />}
        </>
      }
    </div>
  );
};
