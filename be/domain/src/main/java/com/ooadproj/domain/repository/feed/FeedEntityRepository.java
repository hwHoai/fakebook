package com.ooadproj.domain.repository.feed;

import com.ooadproj.domain.model.entity.feed.FeedEntity;
import com.ooadproj.domain.model.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FeedEntityRepository extends JpaRepository<FeedEntity, Long> {
    List<FeedEntity> findAllByUserId(UserEntity user);
    Optional<FeedEntity> findById(Long id);

    @Transactional
    @Query("SELECT f FROM FeedEntity f ORDER BY f.createdAt DESC")
    List<FeedEntity> findTop10ByOrderByCreatedAtDesc();
}
