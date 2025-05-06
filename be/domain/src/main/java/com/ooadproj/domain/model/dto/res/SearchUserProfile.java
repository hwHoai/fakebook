package com.ooadproj.domain.model.dto.res;

import com.ooadproj.domain.model.entity.user.UserEntity;

public class SearchUserProfile {
    private Long id;
    private String name;
    private String avatar;
    private boolean isFollowed;

    public SearchUserProfile(UserEntity userEntity, boolean isFollowed) {
        this.id = userEntity.getId();
        this.name = userEntity.getFirstName() + " " + userEntity.getLastName();
        this.avatar = userEntity.getAvatar();
        this.isFollowed = isFollowed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
    }

    public boolean isFollowed() {
        return isFollowed;
    }

    public void setFollowed(boolean followed) {
        isFollowed = followed;
    }
}