package com.ooadproj.domain.model.dto.res;

import com.ooadproj.domain.model.entity.user.UserEntity;

public class UserPublicInfo {
    private String userName;
    private String userEmail;
    private String phoneNumber;
    private String userProfileImage;

    public UserPublicInfo(UserEntity userEntity) {
        this.userName = userEntity.getFirstName() + " " + userEntity.getLastName();
        this.userEmail = userEntity.getUserEmail();
        this.phoneNumber = userEntity.getPhoneNumber();
        this.userProfileImage = userEntity.getAvatar();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserProfileImage() {
        return userProfileImage;
    }

    public void setUserProfileImage(String userProfileImage) {
        this.userProfileImage = userProfileImage;
    }
}
