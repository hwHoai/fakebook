package com.ooadproj.controller.resources.api.v1.feed;

import com.ooadproj.application.service.feedService.FeedService;
import com.ooadproj.domain.model.dto.req.CreateFeedReqBody;
import com.ooadproj.domain.model.entity.feed.FeedEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
