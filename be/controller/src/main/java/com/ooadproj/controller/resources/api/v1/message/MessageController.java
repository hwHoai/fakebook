package com.ooadproj.controller.resources.api.v1.message;

import com.ooadproj.application.service.messageService.MessageService;
import com.ooadproj.domain.model.dto.message.ChatMessage;
import com.ooadproj.domain.model.entity.message.MessageEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // Log tin nhắn nhận được từ client
        log.info("Received message: {}", chatMessage);

        // Lưu vào database
        MessageEntity messageEntity = messageService.saveMessage(
                chatMessage.getSender(), chatMessage.getReceiver(), chatMessage.getContent());

        // Gửi tin nhắn đến tất cả client đã subscribe
        messagingTemplate.convertAndSend("/topic/messages", messageEntity);
    }
}
