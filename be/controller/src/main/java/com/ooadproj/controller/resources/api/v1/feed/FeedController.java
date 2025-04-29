package com.ooadproj.controller.resources.api.v1.feed;

import com.ooadproj.application.service.feedService.FeedService;
import com.ooadproj.domain.model.dto.req.CreateFeedReqBody;
import com.ooadproj.domain.model.dto.req.GetNewFeedReqBody;
import com.ooadproj.domain.model.dto.res.GetNewFeedResponse;
import com.ooadproj.domain.model.entity.feed.FeedEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/v1/feed")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @PostAuthorize("permitAll()")
    @PostMapping("/create")
    public ResponseEntity<FeedEntity> createFeed(@RequestBody CreateFeedReqBody feed) {
        try {
            FeedEntity newFeed = feedService.createFeed(feed);
            return ResponseEntity.status(201).body(newFeed);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostAuthorize("permitAll()")
    @GetMapping("/new_feeds")
    public ResponseEntity<List<GetNewFeedResponse>>  getNewFeeds(@RequestParam Long userId) {
        try {
            List<GetNewFeedResponse> newFeeds = feedService.getNewFeeds(userId);
            return ResponseEntity.status(200).body(newFeeds);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostAuthorize("permitAll()")
    @GetMapping("guest/new_feeds")
    public ResponseEntity<List<GetNewFeedResponse>>  getNewFeedsForGuest() {
        try {
            List<GetNewFeedResponse> newFeeds = feedService.getNewFeeds();
            return ResponseEntity.status(200).body(newFeeds);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @PostAuthorize("permitAll()")
    @GetMapping("/user_feeds/{userId}")
    public ResponseEntity<List<GetNewFeedResponse>> getFeedsByUserId(@PathVariable Long userId) {
        try {
            List<GetNewFeedResponse> userFeeds = feedService.getFeedsByUserId(userId);
            return ResponseEntity.status(200).body(userFeeds);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
