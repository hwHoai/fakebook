import { useState, useEffect, useContext, useCallback, useLayoutEffect } from 'react';
import { Post } from '../../components/common/Post.jsx';
import { PostBox } from '../../components/common/PostBox.jsx';
import { PostDetail } from '../../components/popup/PostDetail.jsx';
import { AuthProvider, UserInfoProvider } from '../../components/layout/provider/provider.js';
import { FeedService } from '../../service/server/feed/feedService.js';
import { Header } from '../../components/layout/Header.jsx';
import { SidebarRight } from '../../components/layout/SidebarRight.jsx';
import { SidebarLeft } from '../../components/layout/SidebarLeft.jsx';
import { Loading } from '../../components/common/Loading.jsx';

export const NewFeedPage = () => {
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { isAuth } = useContext(AuthProvider);
  const { userPublicInfo } = useContext(UserInfoProvider) || {};
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);

  const handlePostClick = useCallback(
    (post) => {
      setSelectedPost(post);
      setShowPostDetail(true);
    },
    [setSelectedPost, setShowPostDetail]
  );

  const handleClosePostDetail = useCallback(() => {
    setShowPostDetail(false);
    setSelectedPost(null);
  }, [setShowPostDetail, setSelectedPost]);

  const handleScrollEnd = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight * 0.8) {
      setScrollEnd(true);
    }
    if (scrollTop + windowHeight < documentHeight * 0.8) {
      setScrollEnd((prev) => prev);
    }
  }, []);

  useEffect(() => {
    if (showPostDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showPostDetail]);

  useLayoutEffect(() => {
    (async () => {
      let newPost = null;
      if (isAuth) {
        newPost = await FeedService.getNewFeed(userPublicInfo.userId).then((res) => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          return res;
        });
      } else {
        newPost = await FeedService.getNewFeedForGuest().then((res) => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          return res;
        });
      }
      setPostList(newPost);
      if (postList.length > 20) {
        const newPost = await FeedService.getNewFeed(userPublicInfo.userId).then((res) => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          return res;
        });
        setPostList(newPost);
      }
    })();
  }, [isAuth, scrollEnd, postList.length, userPublicInfo.userId]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEnd);
    return () => {
      window.removeEventListener('scroll', handleScrollEnd);
    };
  }, [handleScrollEnd]);

  return (
    <div className={`${loading ? ' overflow-hidden max-w-screen max-h-screen' : ''}`}>
      {loading && (
        <div className='fixed bg-accent-light w-full h-full z-[9999]'>
          <Loading />
        </div>
      )}
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
