package com.ooadproj.domain.model.dto.res;

import com.ooadproj.domain.model.entity.user.UserEntity;

public class UserPublicInfo extends UserEntity {
    private String userName;
    private String userEmail;
    private String phoneNumber;
    private String userProfileImage;

    public UserPublicInfo() {
        this.userName = super.getFirstName() + " " + super.getLastName();
        this.userEmail = super.getUserEmail();
        this.phoneNumber = super.getPhoneNumber();
        this.userProfileImage = super.getAvatar();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String getUserEmail() {
        return userEmail;
    }

    @Override
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String getPhoneNumber() {
        return phoneNumber;
    }

    @Override
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
