package com.ooadproj.domain.model.dto.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageDTO {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String content;
    private LocalDateTime createdAt;
    private Boolean isRead;

//
//    public MessageDTO(Long messageId, Long id, Long id1, String content, LocalDateTime createdAt, Boolean isRead) {
//        this.id = messageId;
//        this.senderId = id;
//        this.receiverId = id1;
//        this.content = content;
//        this.createdAt = createdAt;
//        this.isRead = isRead;
//    }
}
