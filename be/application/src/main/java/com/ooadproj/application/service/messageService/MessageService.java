package com.ooadproj.application.service.messageService;

import com.ooadproj.domain.model.entity.message.MessageEntity;
import com.ooadproj.domain.repository.message.MessageEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageEntityRepository messageEntityRepository;

    public MessageEntity saveMessage(String sender, String receiver, String content) {
        MessageEntity message = new MessageEntity(null, sender, receiver, content, LocalDateTime.now());
        return messageEntityRepository.save(message);
    }

    public List<MessageEntity> getChatHistory(String user1, String user2, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        return messageEntityRepository.findBySenderAndReceiverOrReceiverAndSender(user1, user2, user2, user1, pageable);
    }
}
