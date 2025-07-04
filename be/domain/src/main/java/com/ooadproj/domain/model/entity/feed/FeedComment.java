package com.ooadproj.domain.model.entity.feed;

import com.ooadproj.domain.model.entity.user.UserEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Data
@Entity
@EntityScan
@EnableJpaRepositories
@Table(name = "feed_comment")
@DynamicInsert
@DynamicUpdate
public class FeedComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_comment_id")
    private Long id;

    @ManyToOne(cascade = CascadeType.DETACH, targetEntity = UserEntity.class)
    @JoinColumn(name = "user_id")
    private UserEntity userId;

    @ManyToOne(cascade = CascadeType.DETACH, targetEntity = FeedEntity.class)
    @JoinColumn(name = "feed_id")
    private FeedEntity feedId;

    @Column(columnDefinition = "TEXT comment 'feed comment content'")
    private String content;

    @Column(columnDefinition = "VARCHAR(255) comment 'feed comment created time'")
    private String createdAt;

    @Column(columnDefinition = "VARCHAR(255) comment 'feed comment updated time'")
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

    public FeedEntity getFeedId() {
        return feedId;
    }

    public void setFeedId(FeedEntity feedId) {
        this.feedId = feedId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
