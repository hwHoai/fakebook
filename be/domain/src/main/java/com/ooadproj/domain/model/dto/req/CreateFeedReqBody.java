package com.ooadproj.domain.model.dto.req;

public class CreateFeedReqBody {
    private Long userId;
    private String caption;
    private String listImageString;
    private String createAt;
    private String updateAt;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getListImageString() {
        return listImageString;
    }

    public void setListImageString(String listImageString) {
        this.listImageString = listImageString;
    }

    public String getCreateAt() {
        return createAt;
    }

    public void setCreateAt(String createAt) {
        this.createAt = createAt;
    }

    public String getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(String updateAt) {
        this.updateAt = updateAt;
    }
}
