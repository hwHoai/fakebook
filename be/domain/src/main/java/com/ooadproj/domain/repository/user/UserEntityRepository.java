package com.ooadproj.domain.repository.user;

import com.ooadproj.domain.model.entity.feed.FeedEntity;
import com.ooadproj.domain.model.entity.user.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
    // CREATE
    UserEntity save(UserEntity userEntity);

    // READ
    UserEntity findByUserEmail(String userEmail);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByUserEmail(String userEmail);
    Optional<UserEntity> findById(Long id);
    List<UserEntity> findAllById(Long Id);

    // UPDATE
    @Modifying
    @Transactional
    @Query("UPDATE AuthenticationKeyEntity userKeyToken SET userKeyToken.publicKey = ?1, userKeyToken.refreshToken = ?2 WHERE userKeyToken.user = ?3")
    void updatePublicKeyAndRefreshToken(String publicKey, String refreshToken, UserEntity user);

    @Modifying
    @Transactional
    @Query("UPDATE UserEntity user SET user.newFeedList = ?2 WHERE user.id = ?1")
    void updateIdNewFeedList(Long followerId, List<FeedEntity> newFeedList);

    @Query("SELECT u FROM UserEntity u WHERE " +
            "(LOWER(u.firstName) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :query, '%'))) " +
            "OR (LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<UserEntity> searchByQuery(@Param("query") String query, Pageable pageable);


    // DELETE
}
