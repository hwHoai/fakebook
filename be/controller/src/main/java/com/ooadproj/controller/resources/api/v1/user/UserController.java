package com.ooadproj.controller.resources.api.v1.user;

import com.ooadproj.application.service.userService.UserInfoService;
import com.ooadproj.application.service.userService.UserLoginService;
import com.ooadproj.application.service.userService.UserRegisterService;
import com.ooadproj.domain.model.dto.req.FollowRequest;
import com.ooadproj.domain.model.dto.req.LoginReqBody;
import com.ooadproj.domain.model.dto.req.RenewTokenReqBody;
import com.ooadproj.domain.model.dto.req.UpdateAvatarReqBody;
import com.ooadproj.domain.model.dto.res.UserPublicInfo;
import com.ooadproj.domain.model.dto.res.SearchUserInfo;
import com.ooadproj.domain.model.dto.res.SearchUserProfile;

import com.ooadproj.domain.model.key.JwtToken;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.infracstructure.security.AuthUtils;
import jakarta.annotation.security.PermitAll;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Controller
@RestController
@Slf4j
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserRegisterService userRegisterService;
    @Autowired
    private UserLoginService userLoginService;
    @Autowired
    private UserInfoService userInfoService;

    @PostAuthorize("permitAll()")
    @PostMapping("/register")
    public ResponseEntity<JwtToken> registerUser(@RequestBody UserEntity user) {
        try {
            JwtToken tokens = userRegisterService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostAuthorize("permitAll()")
    @PostMapping("/login")
    public ResponseEntity<JwtToken> loginByEmail(@RequestBody LoginReqBody loginInfo) throws NoSuchAlgorithmException {
        try {
            JwtToken tokens = userLoginService.loginByEmail(loginInfo.getUserEmail(), loginInfo.getPassword());

            return ResponseEntity.status(HttpStatus.OK).body(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostAuthorize("permitAll()")
    @PostMapping("/renew_tokens")
    public ResponseEntity<JwtToken> renewToken(@RequestBody RenewTokenReqBody refToken) {
        try {
            JwtToken tokens = userLoginService.renewToken(refToken.getRefToken());
            return ResponseEntity.status(HttpStatus.CREATED).body(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/info/{userId}")
    public ResponseEntity<UserPublicInfo> getUserPublicInfo(@PathVariable("userId") String userId) throws NoSuchAlgorithmException {
        try {
            Long id = Long.parseLong(userId);
            UserPublicInfo user = userInfoService.getUserInfoById(id);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/follow/{profileUserId}")
    public ResponseEntity<String> followUser(@PathVariable Long profileUserId, @RequestBody FollowRequest request) {
        try {
            Long userId = request.getUserId();
            userInfoService.followUser(userId, profileUserId);
            return ResponseEntity.status(HttpStatus.OK).body("User followed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/unfollow/{profileUserId}")
    public ResponseEntity<String> unfollowUser(@PathVariable Long profileUserId, @RequestBody FollowRequest request) {
        try {
            Long userId = request.getUserId();
            userInfoService.unfollowUser(userId, profileUserId);
            return ResponseEntity.status(HttpStatus.OK).body("User followed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/check_follow/{profileUserId}")
    public ResponseEntity<Boolean> checkFollow(@PathVariable Long profileUserId, @RequestParam Long userId) {
        try {
            Boolean isFollowing = userInfoService.checkFollow(userId, profileUserId);
            return ResponseEntity.status(HttpStatus.OK).body(isFollowing);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<SearchUserInfo>> searchUsers(@RequestParam String query) {
        System.out.println("query: " + query);
        try {
            List<SearchUserInfo> users = userInfoService.searchUsers(query);
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/search_profile")
    public ResponseEntity<List<SearchUserProfile>> searchUsers(@RequestParam String query,  @RequestParam String userId) {
        Long currentUserIdLong = Long.parseLong(userId);
        try {
            List<SearchUserProfile> users = userInfoService.searchUserProfile(query, currentUserIdLong);
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/recommend/{userId}")
    public ResponseEntity<List<SearchUserProfile>> getRecommendedUsers(@PathVariable Long userId) {
        try {
            List<SearchUserProfile> recommendedUsers = userInfoService.getRecommendedUsers(userId);
            return ResponseEntity.status(HttpStatus.OK).body(recommendedUsers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/contacts/{userId}")
    public ResponseEntity<List<SearchUserProfile>> getContacts(@PathVariable Long userId) {
        try {
            List<SearchUserProfile> contacts = userInfoService.getContacts(userId);
            return ResponseEntity.status(HttpStatus.OK).body(contacts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostAuthorize("permitAll()")
    @PatchMapping("/update/user_avatar")
    public ResponseEntity<String> updateUserAvatar(@RequestBody UpdateAvatarReqBody updateAvatarReqBody) {
        try {
            Long userId = updateAvatarReqBody.getUserId();
            String avatar = updateAvatarReqBody.getAvatarName();
            userInfoService.updateUserAvatarById(userId, avatar);
            return ResponseEntity.status(HttpStatus.OK).body("User avatar updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}
