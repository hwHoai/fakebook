import { FeedService } from '../service/feed/feedService';

export const updatePostList = async (isAuth = false, oldPostList = [], userId) => {
  return isAuth
    ? await FeedService.getNewFeed(userId).then((res) => {
        return oldPostList.concat(res);
      })
    : await FeedService.getNewFeedForGuest().then((res) => {
        return oldPostList.concat(res);
      });
};
