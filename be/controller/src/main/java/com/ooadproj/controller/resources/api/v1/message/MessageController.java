package com.ooadproj.controller.resources.api.v1.message;

import com.ooadproj.application.service.messageService.MessageService;
import com.ooadproj.application.service.userService.UserInfoService;
import com.ooadproj.domain.model.dto.message.ChatMessage;
import com.ooadproj.domain.model.dto.message.InboxList;
import com.ooadproj.domain.model.dto.message.MessageDTO;
import com.ooadproj.domain.model.dto.message.MessageResponse;
import com.ooadproj.domain.model.entity.message.MessageEntity;
import com.ooadproj.infracstructure.security.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/message")
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

        MessageDTO response = new MessageDTO(
                messageEntity.getMessageId(),
                messageEntity.getSender().getId(),
                messageEntity.getReceiver().getId(),
                messageEntity.getContent(),
                messageEntity.getCreatedAt(),
                messageEntity.getIsRead()
        );

        messagingTemplate.convertAndSend("/topic/messages/" +  messageEntity.getSender().getId(), response);
        messagingTemplate.convertAndSend("/topic/messages/" +  messageEntity.getReceiver().getId(), response);
    }

    @GetMapping("/inbox/{userId}")
    public ResponseEntity<List<InboxList>> getInbox(@PathVariable("userId") Long userId) {
        Long authenticatedUserId = AuthUtils.getCurrentUserId();
        if (!userId.equals(authenticatedUserId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        List<MessageEntity> messages = messageService.getUserInbox(userId);
        List<InboxList> inbox = messages.stream().map(msg -> {
            boolean isSentByMe = msg.getSender().getId().equals(userId);
            Long friendId = isSentByMe ? msg.getReceiver().getId() : msg.getSender().getId();
            String friendUsername = userInfoService.getUsernameById(friendId);
            String friendAvatar = userInfoService.getAvatarById(friendId);
            return new InboxList(
                    friendId,
                    friendUsername,
                    msg.getContent(),
                    friendAvatar,
                    msg.getCreatedAt(),
                    isSentByMe || msg.getIsRead(),
                    isSentByMe
            );
        }).toList();

        return ResponseEntity.status(HttpStatus.OK).body(inbox);
    }

    @GetMapping("/chat/{friendId}")
    public Page<MessageDTO> getMessagesWithUser(
            @PathVariable("friendId") Long friendId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size
    ) {
        Long currentUserId = AuthUtils.getCurrentUserId();
        PageRequest pageRequest = PageRequest.of(page, size);
        return messageService.getMessagesBetweenUsers(currentUserId, friendId, pageRequest);
    }

    @PostMapping("/chat/mark_read/{friendId}")
    public ResponseEntity<?> markMessagesAsRead(@PathVariable("friendId") Long friendId) {
        Long currentUserId = AuthUtils.getCurrentUserId();
        messageService.markMessagesAsRead(currentUserId, friendId);
        System.out.println("Mark messages as read: " + currentUserId + " " + friendId);
        return ResponseEntity.status(HttpStatus.OK).body("Messages marked as read");
    }


}