package com.ooadproj.domain.model.entity.user;

import com.ooadproj.domain.model.entity.feed.FeedComment;
import com.ooadproj.domain.model.entity.feed.FeedEntity;
import com.ooadproj.domain.model.entity.key.AuthenticationKeyEntity;
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
@Table(name = "user_info")
@DynamicInsert
@DynamicUpdate
@ToString(exclude = {"keyTokenList", "ownFeedList", "feedCommentList", "followerList", "followingList", "newFeedList"})
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(columnDefinition = "VARCHAR(255) comment 'user first name'", nullable = false)
    private String firstName;

    @Column(columnDefinition = "VARCHAR(255) comment 'user last name'", nullable = false)
    private String lastName;

    @Column(columnDefinition = "VARCHAR(255) comment 'user email'", nullable = false, unique = true)
    private String userEmail;

    @Column(columnDefinition = "VARCHAR(255) comment 'user password'", nullable = false)
    private String password;

    @Column(columnDefinition = "VARCHAR(255) comment 'user phone number'", unique = true)
    private String phoneNumber;

    @Column(columnDefinition = "VARCHAR(255) comment 'user avatar'")
    private String avatar;

    @OneToMany(mappedBy = "user", cascade = CascadeType.DETACH)
    private List<AuthenticationKeyEntity> keyTokenList;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.DETACH)
    private List<FeedEntity> ownFeedList;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "new_feed",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "feed_id"))
    private List<FeedEntity> newFeedList;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.DETACH)
    private List<FeedComment> feedCommentList;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_follower",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private List<UserEntity> followerList;
    @ManyToMany(mappedBy = "followerList")
    private List<UserEntity> follower;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_following",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id"))
    private List<UserEntity> followingList;
    @ManyToMany(mappedBy = "followingList")
    private List<UserEntity> following;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_like",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "feed_id"))
    private List<FeedEntity> feedLiked;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_share",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "feed_id"))


    private List<FeedEntity> feedShared;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<AuthenticationKeyEntity> getKeyTokenList() {
        return keyTokenList;
    }

    public void setKeyTokenList(List<AuthenticationKeyEntity> keyTokenList) {
        this.keyTokenList = keyTokenList;
    }

    public List<FeedEntity> getOwnFeedList() {
        return ownFeedList;
    }

    public void setOwnFeedList(List<FeedEntity> ownFeedList) {
        this.ownFeedList = ownFeedList;
    }

    public List<FeedEntity> getNewFeedList() {
        return newFeedList;
    }

    public void setNewFeedList(List<FeedEntity> newFeedList) {
        this.newFeedList = newFeedList;
    }

    public List<FeedComment> getFeedCommentList() {
        return feedCommentList;
    }

    public void setFeedCommentList(List<FeedComment> feedCommentList) {
        this.feedCommentList = feedCommentList;
    }

    public List<UserEntity> getFollowerList() {
        return followerList;
    }

    public void setFollowerList(List<UserEntity> followerList) {
        this.followerList = followerList;
    }

    public List<UserEntity> getFollower() {
        return follower;
    }

    public void setFollower(List<UserEntity> follower) {
        this.follower = follower;
    }

    public List<UserEntity> getFollowingList() {
        return followingList;
    }

    public void setFollowingList(List<UserEntity> followingList) {
        this.followingList = followingList;
    }

    public List<UserEntity> getFollowing() {
        return following;
    }

    public void setFollowing(List<UserEntity> following) {
        this.following = following;
    }

    public List<FeedEntity> getFeedLiked() {
        return feedLiked;
    }

    public void setFeedLiked(List<FeedEntity> feedLiked) {
        this.feedLiked = feedLiked;
    }

    public List<FeedEntity> getFeedShared() {
        return feedShared;
    }

    public void setFeedShared(List<FeedEntity> feedShared) {
        this.feedShared = feedShared;
    }
}
