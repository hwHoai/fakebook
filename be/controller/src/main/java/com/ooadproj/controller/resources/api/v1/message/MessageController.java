package com.ooadproj.controller.resources.api.v1.message;

import com.ooadproj.application.service.messageService.MessageService;
import com.ooadproj.application.service.userService.UserInfoService;
import com.ooadproj.domain.model.dto.message.ChatMessage;
import com.ooadproj.domain.model.dto.message.InboxList;
import com.ooadproj.domain.model.dto.message.MessageResponse;
import com.ooadproj.domain.model.entity.message.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v1/message")
@Slf4j
public class MessageController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessage chatMessage) {

        MessageEntity messageEntity = messageService.saveMessage(chatMessage);

        MessageResponse response = new MessageResponse(
                messageEntity.getMessageId(),
                messageEntity.getSender().getId(),
                messageEntity.getReceiver().getId(),
                messageEntity.getContent(),
                messageEntity.getCreatedAt()
        );

        messagingTemplate.convertAndSend("/topic/messages", response);
    }


    @GetMapping("/inbox/{userId}")
    public ResponseEntity<List<InboxList>> getInbox(@PathVariable("userId") Long userId) {
        List<MessageEntity> messages = messageService.getUserInbox(userId);
        List<InboxList> inbox = messages.stream().map(msg -> {
            boolean isSentByMe = msg.getSender().getId().equals(userId);
            Long friendId = isSentByMe ? msg.getReceiver().getId() : msg.getSender().getId();
            String friendUsername = userInfoService.getUsernameById(friendId);
            return new InboxList(
                    friendId,
                    friendUsername,
                    msg.getContent(),
                    msg.getCreatedAt(),
                    isSentByMe || msg.getIsRead(),
                    isSentByMe
            );
        }).toList();

        return ResponseEntity.status(HttpStatus.OK).body(inbox);
    }
}
