package com.ooadproj.domain.model.entity.feed;

import com.ooadproj.domain.model.entity.user.UserEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@Data
@Entity
@EntityScan
@EnableJpaRepositories
@Table(name = "feed")
@DynamicUpdate
@DynamicInsert
@ToString(exclude = {"user", "userLikedList", "commentsList", "userSharedList"})
public class FeedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_id")
    private Long id;

    @ManyToOne(cascade = CascadeType.DETACH, targetEntity = UserEntity.class)
    @JoinColumn(name = "user_id")
    private UserEntity userId;

    @Column( columnDefinition = "TEXT comment 'feed caption'", nullable = false)
    private String caption;

    @Column(columnDefinition = "TEXT comment 'imageName1___imageName2___imageName3...'")
    private String listImageString;

    @ManyToMany(mappedBy = "newFeedList")
    private List<UserEntity> userFollowList;

    @ManyToMany(mappedBy = "feedLiked", cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    private List<UserEntity> userLikedList;

    @ManyToMany(mappedBy = "feedShared", cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    private List<UserEntity> userSharedList;

    @OneToMany(mappedBy = "feedId", cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    private List<FeedComment>  commentsList;

    @Column(columnDefinition = "VARCHAR(255) comment 'feed created time'")
    private String createdAt;

    @Column(columnDefinition = "VARCHAR(255) comment 'feed updated time'")
    private String updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUserId() {
        return userId;
    }

    public void setUserId(UserEntity userId) {
        this.userId = userId;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getListImageString() {
        return listImageString;
    }

    public void setListImageString(String listImageString) {
        this.listImageString = listImageString;
    }

    public List<UserEntity> getUserFollowList() {
        return userFollowList;
    }

    public void setUserFollowList(List<UserEntity> userFollowList) {
        this.userFollowList = userFollowList;
    }

    public List<UserEntity> getUserLikedList() {
        return userLikedList;
    }

    public void setUserLikedList(List<UserEntity> userLikedList) {
        this.userLikedList = userLikedList;
    }

    public List<UserEntity> getUserSharedList() {
        return userSharedList;
    }

    public void setUserSharedList(List<UserEntity> userSharedList) {
        this.userSharedList = userSharedList;
    }

    public List<FeedComment> getCommentsList() {
        return commentsList;
    }

    public void setCommentsList(List<FeedComment> commentsList) {
        this.commentsList = commentsList;
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
