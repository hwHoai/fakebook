package com.ooadproj.domain.model.entity.key;

import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Data
@Entity
@EntityScan
@EnableJpaRepositories
@Table(name = "user_key_token")
@DynamicInsert
@DynamicUpdate
public class UserKeyTokenDomainEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyId")
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String publicKey;

    @Column(columnDefinition = "TEXT")
    private String refreshToken;

    @ManyToOne(cascade = CascadeType.DETACH, targetEntity = UserDomainEntity.class)
    @JoinColumn(name = "user_id")
    private UserDomainEntity user;
}
