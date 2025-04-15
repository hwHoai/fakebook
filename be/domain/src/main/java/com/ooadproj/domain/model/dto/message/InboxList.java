package com.ooadproj.domain.model.dto.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InboxList {
    private Long friendId;
    private String friendUsername;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private boolean isLastMessageRead;
    private boolean isSentByMe;
}