package com.ooadproj.domain.model.entity.user;

import com.ooadproj.domain.model.entity.key.UserKeyTokenDomainEntity;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@Data
@Entity
@EntityScan
@EnableJpaRepositories
@Table(name = "user_info")
@DynamicInsert
@DynamicUpdate
public class UserDomainEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(columnDefinition = "VARCHAR(255) comment 'user first name'", nullable = false)
    private String firstName;

    @Column(columnDefinition = "VARCHAR(255) comment 'user last name'", nullable = false)
    private String lastName;

    @Column(columnDefinition = "VARCHAR(255) comment 'user email'", nullable = false, unique = true)
    private String userEmail;

    @Column(columnDefinition = "VARCHAR(255) comment 'user password'", nullable = false)
    private String password;

    @Column(columnDefinition = "VARCHAR(255) comment 'user phone number'", unique = true)
    private String phoneNumber;

    @OneToMany(mappedBy = "user", cascade = CascadeType.DETACH)
    private List<UserKeyTokenDomainEntity> keyTokenList;

}
