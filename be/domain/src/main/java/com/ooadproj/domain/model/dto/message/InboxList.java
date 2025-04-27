package com.ooadproj.domain.model.dto.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InboxList {
    private Long friendId;
    private String friendUsername;
    private String lastMessage;
    private String friendAvatar;
    private LocalDateTime lastMessageTime;
    private boolean isLastMessageRead;
    private boolean isSentByMe;

    public InboxList(Long friendId, String friendUsername, String lastMessage, String friendAvatar,LocalDateTime lastMessageTime, boolean isLastMessageRead, boolean isSentByMe) {
        this.friendId = friendId;
        this.friendUsername = friendUsername;
        this.lastMessage = lastMessage;
        this.friendAvatar = friendAvatar;
        this.lastMessageTime = lastMessageTime;
        this.isLastMessageRead = isLastMessageRead;
        this.isSentByMe = isSentByMe;
    }

    public Long getFriendId() {
        return friendId;
    }

    public void setFriendId(Long friendId) {
        this.friendId = friendId;
    }

    public String getFriendUsername() {
        return friendUsername;
    }

    public void setFriendUsername(String friendUsername) {
        this.friendUsername = friendUsername;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public LocalDateTime getLastMessageTime() {
        return lastMessageTime;
    }

    public void setLastMessageTime(LocalDateTime lastMessageTime) {
        this.lastMessageTime = lastMessageTime;
    }

    public boolean isLastMessageRead() {
        return isLastMessageRead;
    }

    public void setLastMessageRead(boolean lastMessageRead) {
        isLastMessageRead = lastMessageRead;
    }

    public boolean isSentByMe() {
        return isSentByMe;
    }

    public void setSentByMe(boolean sentByMe) {
        isSentByMe = sentByMe;
    }

    public String getFriendAvatar() {
        return friendAvatar;
    }

    public void setFriendAvatar(String friendAvatar) {
        this.friendAvatar = friendAvatar;
    }
}
