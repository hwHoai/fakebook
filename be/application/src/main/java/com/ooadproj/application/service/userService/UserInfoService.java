package com.ooadproj.application.service.userService;

import com.ooadproj.domain.model.dto.res.UserPublicInfo;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.user.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
    @Autowired
    private UserEntityRepository userEntityRepository;

    public String getUsernameById(Long id) {
        return userEntityRepository.findById(id)
                .map(user -> user.getFirstName() + " " + user.getLastName())
                .orElse(null);
    }

    public UserPublicInfo getUserInfoById(Long id) {
        try {
            UserEntity userEntity = userEntityRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            UserPublicInfo userPublicInfo = new UserPublicInfo(userEntity);
            return userPublicInfo;
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
    }

    public String getAvatarById(Long id) {
        return userEntityRepository.findById(id)
                .map(UserEntity::getAvatar)
                .orElse(null);
    }

    public void followUser(Long followerId, Long followingId) {
        UserEntity follower = userEntityRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Follower not found"));
        UserEntity following = userEntityRepository.findById(followingId)
                .orElseThrow(() -> new RuntimeException("User to follow not found"));

        // Add the following user to the follower's following list
        if (!follower.getFollowingList().contains(following)) {
            follower.getFollowingList().add(following);
        }

        // Add the follower to the following user's follower list
        if (!following.getFollowerList().contains(follower)) {
            following.getFollowerList().add(follower);
        }

        // Save both entities
        userEntityRepository.save(follower);
        userEntityRepository.save(following);
    }

    public void unfollowUser(Long followerId, Long followingId) {
        UserEntity follower = userEntityRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Follower not found"));
        UserEntity following = userEntityRepository.findById(followingId)
                .orElseThrow(() -> new RuntimeException("User to unfollow not found"));

        // Remove the following user from the follower's following list
        follower.getFollowingList().remove(following);

        // Remove the follower from the following user's follower list
        following.getFollowerList().remove(follower);

        // Save both entities
        userEntityRepository.save(follower);
        userEntityRepository.save(following);
    }

    public boolean checkFollow(Long userId, Long profileUserId) {
        UserEntity user = userEntityRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserEntity profileUser = userEntityRepository.findById(profileUserId)
                .orElseThrow(() -> new RuntimeException("Profile user not found"));

        // Check if the profile user is in the user's following list
        return user.getFollowingList().contains(profileUser);
    }
}
