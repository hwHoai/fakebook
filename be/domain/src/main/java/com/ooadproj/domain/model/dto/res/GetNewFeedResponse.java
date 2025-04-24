package com.ooadproj.domain.model.dto.res;

import com.ooadproj.domain.model.entity.feed.FeedComment;
import com.ooadproj.domain.model.entity.user.UserEntity;

import java.util.List;

public class GetNewFeedResponse {
    private Long feedId;
    private Long authorId;
    private String caption;
    private String imagesUrl;
    private UserPublicInfo author;
    private List<UserEntity> likedUser;
    private int numberOfLikes;
    private List<FeedComment> comments;
    private int numberOfComments;
    private List<UserEntity> sharedUser;
    private int numberOfShares;
    private String createdAt;
    private String updatedAt;

    public GetNewFeedResponse(Long feedId,Long authorId ,String caption, String imagesUrl, UserPublicInfo author, List<UserEntity> likedUser, int numberOfLikes, List<FeedComment> comments, int numberOfComments, List<UserEntity> sharedUser, int numberOfShares, String createdAt, String updatedAt) {
        this.feedId = feedId;
        this.authorId = authorId;
        this.caption = caption;
        this.imagesUrl = imagesUrl;
        this.author = author;
        this.likedUser = likedUser;
        this.numberOfLikes = numberOfLikes;
        this.comments = comments;
        this.numberOfComments = numberOfComments;
        this.sharedUser = sharedUser;
        this.numberOfShares = numberOfShares;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public Long getFeedId() {
        return feedId;
    }

    public void setFeedId(Long feedId) {
        this.feedId = feedId;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getImagesUrl() {
        return imagesUrl;
    }

    public void setImagesUrl(String imagesUrl) {
        this.imagesUrl = imagesUrl;
    }

    public UserPublicInfo getUser() {
        return author;
    }

    public void setUser(UserPublicInfo author) {
        this.author = GetNewFeedResponse.this.author;
    }

    public List<UserEntity> getLikedUser() {
        return likedUser;
    }

    public void setLikedUser(List<UserEntity> likedUser) {
        this.likedUser = likedUser;
    }

    public int getNumberOfLikes() {
        return numberOfLikes;
    }

    public void setNumberOfLikes(int numberOfLikes) {
        this.numberOfLikes = numberOfLikes;
    }

    public List<FeedComment> getComments() {
        return comments;
    }

    public void setComments(List<FeedComment> comments) {
        this.comments = comments;
    }

    public int getNumberOfComments() {
        return numberOfComments;
    }

    public void setNumberOfComments(int numberOfComments) {
        this.numberOfComments = numberOfComments;
    }

    public List<UserEntity> getSharedUser() {
        return sharedUser;
    }

    public void setSharedUser(List<UserEntity> sharedUser) {
        this.sharedUser = sharedUser;
    }

    public int getNumberOfShares() {
        return numberOfShares;
    }

    public void setNumberOfShares(int numberOfShares) {
        this.numberOfShares = numberOfShares;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
