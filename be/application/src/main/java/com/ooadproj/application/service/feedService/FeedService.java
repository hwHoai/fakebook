package com.ooadproj.application.service.feedService;

import com.ooadproj.domain.model.dto.req.CreateFeedReqBody;
import com.ooadproj.domain.model.dto.res.GetNewFeedResponse;
import com.ooadproj.domain.model.dto.res.UserPublicInfo;
import com.ooadproj.domain.model.entity.feed.FeedEntity;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.feed.FeedEntityRepository;
import com.ooadproj.domain.repository.user.UserEntityRepository;
import org.aspectj.weaver.ast.Literal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeedService {
    @Autowired
    private FeedEntityRepository feedEntityRepository;

    @Autowired
    private UserEntityRepository userEntityRepository;

    public FeedEntity createFeed(CreateFeedReqBody feed) {
        try {
            //Get user creating the feed
            UserEntity user = userEntityRepository.findById(feed.getUserId()).orElse(null);

            if (user == null) {
                System.err.println("User not found");
                return null;
            }

            // Create a new FeedEntity object
            FeedEntity newFeed = new FeedEntity();
            newFeed.setUserId(user);
            newFeed.setCaption(feed.getCaption());
            newFeed.setListImageString(feed.getListImageString());
            newFeed.setCreatedAt(feed.getCreateAt());
            newFeed.setUpdatedAt(feed.getUpdateAt());
           // Save the feed to the database
            feedEntityRepository.save(newFeed);

            //Push new feed to the followers
            List<UserEntity> followers = user.getFollowerList();
            for (UserEntity follower : followers) {
                List<FeedEntity> newFeedList = follower.getNewFeedList();
                newFeedList.add(newFeed);
                userEntityRepository.updateIdNewFeedList(follower.getId(), newFeedList);
            }
            return newFeed;
        } catch (Exception e) {
            System.err.println("Error creating feed: " + e.getMessage());
            return null;
        }
    }

    public List<GetNewFeedResponse> getNewFeeds(Long userId) {
        try {
            // Get the user who is requesting the new feeds
            UserEntity user = userEntityRepository.findById(userId).orElse(null);
            if (user == null) {
                System.err.println("User not found");
                return null;
            }

            // Get the list of new feeds for the user
            List<FeedEntity> newFeedList = user.getNewFeedList() != null ? user.getNewFeedList() : new ArrayList<>();
            System.out.println("New feed list size: " + newFeedList.size());
            if (newFeedList == null || newFeedList.isEmpty() || newFeedList.size() < 10) {
                pushLatestFeeds(user);
                newFeedList = user.getNewFeedList();
                System.out.println("New feed list size after push: " + newFeedList.size());

                //Logic to remove read feed
            }

            // Convert FeedEntity to GetNewFeedResponse
            List<GetNewFeedResponse> response = new ArrayList<>();
            for (FeedEntity feed : newFeedList) {
                GetNewFeedResponse feedResponse = new GetNewFeedResponse(
                        feed.getId(),
                        feed.getUserId().getId(),
                        feed.getCaption(),
                        feed.getListImageString(),
                        new UserPublicInfo(feed.getUserId()),
                        feed.getUserLikedList() != null ? feed.getUserLikedList() : new ArrayList<>(),
                        feed.getUserLikedList().size() | 0,
                        feed.getCommentsList() != null ? feed.getCommentsList() : new ArrayList<>(),
                        feed.getCommentsList().size() | 0,
                        feed.getUserSharedList() != null ? feed.getUserSharedList() : new ArrayList<>(),
                        feed.getUserSharedList().size() | 0,
                        feed.getCreatedAt(),
                        feed.getUpdatedAt()
                );
                response.add(feedResponse);
            }
            return response;
        } catch (Exception e) {
            System.err.println("Error getting random feed: " + e.getMessage());
            return null;
        }
    }

    public List<GetNewFeedResponse> getNewFeeds() {
        try {
            // Get the list of new feeds for the user
            List<FeedEntity> newFeedList = new ArrayList<>();
            System.out.println("New feed list size: " + newFeedList.size());
            if (newFeedList == null || newFeedList.isEmpty() || newFeedList.size() < 10) {
                List<FeedEntity> top10LatestFeed =  feedEntityRepository.findTop10ByOrderByCreatedAtDesc();
                newFeedList.addAll(top10LatestFeed);
                System.out.println("New feed list size after push: " + newFeedList.size());
                //Logic to remove read feed
            }
            // Convert FeedEntity to GetNewFeedResponse
            List<GetNewFeedResponse> response = new ArrayList<>();
            for (FeedEntity feed : newFeedList) {
                GetNewFeedResponse feedResponse = new GetNewFeedResponse(
                        feed.getId(),
                        feed.getUserId().getId(),
                        feed.getCaption(),
                        feed.getListImageString(),
                        new UserPublicInfo(feed.getUserId()),
                        feed.getUserLikedList() != null ? feed.getUserLikedList() : new ArrayList<>(),
                        feed.getUserLikedList().size() | 0,
                        feed.getCommentsList() != null ? feed.getCommentsList() : new ArrayList<>(),
                        feed.getCommentsList().size() | 0,
                        feed.getUserSharedList() != null ? feed.getUserSharedList() : new ArrayList<>(),
                        feed.getUserSharedList().size() | 0,
                        feed.getCreatedAt(),
                        feed.getUpdatedAt()
                );
                response.add(feedResponse);
            }
            return response;
        } catch (Exception e) {
            System.err.println("Error getting random feed: " + e.getMessage());
            return null;
        }
    }

    public List<FeedEntity> pushLatestFeeds(UserEntity user) {
        try {
           List<FeedEntity> top10LatestFeed =  feedEntityRepository.findTop10ByOrderByCreatedAtDesc();
            if (top10LatestFeed == null) {
                System.err.println("No new feeds found");
                return null;
            }

            // Check if the user already has the  feed
            List<FeedEntity> oldFeedList = user.getNewFeedList();
            List<FeedEntity> newFeedList = new ArrayList<>();
            for (FeedEntity feed : top10LatestFeed) {
                if (!oldFeedList.contains(feed)) {
                    newFeedList.add(feed);
                }
            }
                oldFeedList.addAll(newFeedList);
                userEntityRepository.updateIdNewFeedList(user.getId(), oldFeedList);
            return oldFeedList;
        } catch (Exception e) {
            System.err.println("Error getting all feeds: " + e.getMessage());
            return null;
        }
    }
}
