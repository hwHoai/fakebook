package com.ooadproj.domain.repository.message;


import com.ooadproj.domain.model.entity.message.MessageEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface MessageEntityRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
            String sender, String receiver, String receiver2, String sender2, Pageable pageable);

    // Lấy tin nhắn mới nhất với từng người đã chat
    @Query(value = """
        SELECT * FROM message m
        WHERE m.message_id IN (
            SELECT MAX(message_id)
            FROM message
            WHERE sender_id = :userId OR receiver_id = :userId
            GROUP BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id)
        )
        ORDER BY m.created_at DESC
    """, nativeQuery = true)
    List<MessageEntity> findUserInbox(@Param("userId") Long userId);
}

