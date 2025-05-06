package com.ooadproj.domain.model.dto.res;

import com.ooadproj.domain.model.entity.user.UserEntity;

public class SearchUserInfo {
    private Long id;
    private String userName;
    private String avatar;

    public SearchUserInfo(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.userName = userEntity.getFirstName() + " " + userEntity.getLastName();
        this.avatar = userEntity.getAvatar();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return userName;
    }

    public void setName(String name) {
        this.userName = name;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String name) {
        this.avatar = avatar;
    }
}
