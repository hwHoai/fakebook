package com.ooadproj.domain.model.entity.key;

import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Getter
@Setter
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public UserDomainEntity getUser() {
        return user;
    }

    public void setUser(UserDomainEntity user) {
        this.user = user;
    }
}
