package com.ooadproj.application.service.messageService;

import com.ooadproj.domain.model.dto.message.ChatMessage;
import com.ooadproj.domain.model.dto.message.InboxList;
import com.ooadproj.domain.model.entity.message.MessageEntity;
import com.ooadproj.domain.repository.message.MessageEntityRepository;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.user.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class MessageService {

    @Autowired
    private UserEntityRepository userRepository;
    @Autowired
    private MessageEntityRepository messageEntityRepository;

    public MessageEntity saveMessage(ChatMessage chatMessage) {
        UserEntity sender = userRepository.findById(chatMessage.getSenderId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        UserEntity receiver = userRepository.findById(chatMessage.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        MessageEntity message = new MessageEntity();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(chatMessage.getContent());
        message.setCreatedAt(LocalDateTime.now());
        message.setIsRead(false);

        return messageEntityRepository.save(message);
    }


    public List<MessageEntity> getUserInbox(Long userId) {
        return messageEntityRepository.findUserInbox(userId);
    }


}
