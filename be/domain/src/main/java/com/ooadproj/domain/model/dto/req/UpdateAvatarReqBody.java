package com.ooadproj.domain.model.dto.req;

public class UpdateAvatarReqBody {
    private Long userId;
    private String avatarName;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAvatarName() {
        return avatarName;
    }

    public void setAvatar(String avatarName) {
        this.avatarName = avatarName;
    }
}
