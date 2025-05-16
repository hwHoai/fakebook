package com.ooadproj.application.service.userService;

import com.ooadproj.domain.model.dto.res.UserPublicInfo;
import com.ooadproj.domain.model.dto.res.SearchUserInfo;
import com.ooadproj.domain.model.dto.res.SearchUserProfile;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.message.MessageEntityRepository;
import com.ooadproj.domain.repository.user.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

import java.util.stream.Collectors;

@Service
public class UserInfoService {
    @Autowired
    private UserEntityRepository userEntityRepository;
    @Autowired
    private MessageEntityRepository messageEntityRepository;

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


    public List<SearchUserInfo> searchUsers(String query) {
        Pageable pageable = PageRequest.of(0, 4); // Limit results to top 5
        List<UserEntity> users = userEntityRepository.searchByQuery(query, pageable);
        return users.stream()
                .map(SearchUserInfo::new) // Convert UserEntity to SearchUserInfo
                .toList();
    }

    public List<SearchUserProfile> searchUserProfile(String query, Long currentUserId) {
        List<UserEntity> users = userEntityRepository.searchByQuery(query, null); // Fetch all matching results
        UserEntity currentUser = userEntityRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        return users.stream()
                .map(user -> {
                    boolean isFollowed = currentUser.getFollowingList().contains(user);
                    return new SearchUserProfile(user, isFollowed);
                })
                .toList();
    }


    public List<SearchUserProfile> getRecommendedUsers(Long currentUserId) {
        UserEntity currentUser = userEntityRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        // Refresh the following list from the database
        List<UserEntity> updatedFollowingList = userEntityRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"))
                .getFollowingList();

        // Get the list of users followed by the current user's friends
        List<UserEntity> friends = currentUser.getFollowingList();
        Map<UserEntity, Long> followedByFriendsCount = friends.stream()
                .flatMap(friend -> friend.getFollowingList().stream()) // Get users followed by each friend
                .filter(user -> !user.equals(currentUser)) // Exclude the current user
                .filter(user -> !updatedFollowingList.contains(user)) // Exclude already-followed users
                .collect(Collectors.groupingBy(user -> user, Collectors.counting())); // Count occurrences

        // Sort by count in descending order and limit to top 3
        List<SearchUserProfile> recommendedUsers = followedByFriendsCount.entrySet().stream()
                .sorted((e1, e2) -> Long.compare(e2.getValue(), e1.getValue()))
                .limit(3)
                .map(entry -> new SearchUserProfile(entry.getKey(), false)) // Map to DTO
                .toList();

        // If no recommendations from friends, fallback to users with the most followers
        if (recommendedUsers.isEmpty()) {
            List<UserEntity> mostFollowedUsers = userEntityRepository.findTopUsersByFollowerCount(PageRequest.of(0, 3));
            recommendedUsers = mostFollowedUsers.stream()
                    .filter(user -> !user.getId().equals(currentUser.getId())) // Exclude the current user
                    .filter(user -> !updatedFollowingList.contains(user)) // Exclude already-followed users
                    .map(user -> new SearchUserProfile(user, false)) // Map to DTO
                    .toList();
        }

        return recommendedUsers;
    }


    public List<SearchUserProfile> getContacts(Long currentUserId) {
        UserEntity currentUser = userEntityRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        // Tập ID đã thấy để tránh trùng
        Set<Long> seenUserIds = new HashSet<>();

        // Step 1: Fetch recent chat users
        List<UserEntity> recentChatUsers = messageEntityRepository.findUserInbox(currentUserId).stream()
                .map(message -> {
                    UserEntity other = message.getSender().getId().equals(currentUserId)
                            ? message.getReceiver()
                            : message.getSender();
                    return other;
                })
                .filter(user -> seenUserIds.add(user.getId())) // lọc trùng theo userId
                .limit(5)
                .toList();

        // Step 2: If less than 5, fetch recently followed users
        List<UserEntity> contactRecommendations = new ArrayList<>(recentChatUsers);
        if (contactRecommendations.size() < 5) {
            List<UserEntity> followingList = currentUser.getFollowingList();
            List<UserEntity> recentFollowedUsers = followingList.stream()
                    .sorted(Comparator.comparing(UserEntity::getId).reversed()) // giả định ID tăng dần theo thời gian
                    .filter(user -> seenUserIds.add(user.getId())) // tránh trùng
                    .limit(5 - contactRecommendations.size())
                    .toList();
            contactRecommendations.addAll(recentFollowedUsers);
        }

        // Step 3: Map to SearchUserProfile
        Set<Long> followingIds = currentUser.getFollowingList().stream()
                .map(UserEntity::getId)
                .collect(Collectors.toSet());

        return contactRecommendations.stream()
                .map(user -> new SearchUserProfile(user, followingIds.contains(user.getId())))
                .toList();
    }

    public void updateUserAvatarById(Long id, String imgName) {
        System.out.println("RECEIVED ID: " + id + " AND IMG NAME: " + imgName);
        userEntityRepository.updateUserAvatarById(id, imgName);
    }

}
