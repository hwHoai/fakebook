package com.ooadproj.domain.model.dto.req;

public class GetNewFeedReqBody {
    private int numberOfFeed;
    private Long userId;

    public int getNumberOfFeed() {
        return numberOfFeed;
    }

    public void setNumberOfFeed(int numberOfFeed) {
        this.numberOfFeed = numberOfFeed;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
