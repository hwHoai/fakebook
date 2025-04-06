package com.ooadproj.domain.repository.message;


import com.ooadproj.domain.model.entity.message.MessageEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface MessageEntityRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findBySenderAndReceiverOrReceiverAndSender(
            String sender, String receiver, String receiver2, String sender2, Pageable pageable);
}

