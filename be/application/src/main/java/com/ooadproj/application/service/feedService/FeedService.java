package com.ooadproj.application.service.feedService;

import com.ooadproj.domain.model.dto.req.CreateFeedReqBody;
import com.ooadproj.domain.model.entity.feed.FeedEntity;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.user.FeedEntityRepository;
import com.ooadproj.domain.repository.user.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            newFeed.setUser(user);
            newFeed.setCaption(feed.getCaption());
            newFeed.setListImageString(feed.getListImageString());
            newFeed.setCreatedAt(feed.getCreateAt());
            newFeed.setUpdatedAt(feed.getUpdateAt());
           // Save the feed to the database
            FeedEntity savedFeed = feedEntityRepository.save(newFeed);

            //Push notification to the followers

            return newFeed;
        } catch (Exception e) {
            System.err.println("Error creating feed: " + e.getMessage());
            return null;
        }
    }
}
