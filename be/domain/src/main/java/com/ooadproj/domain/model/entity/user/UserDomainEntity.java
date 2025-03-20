package com.ooadproj.domain.model.entity.user;

import com.ooadproj.domain.model.entity.key.UserKeyTokenDomainEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@Getter
@Setter
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<UserKeyTokenDomainEntity> getKeyTokenList() {
        return keyTokenList;
    }

    public void setKeyTokenList(List<UserKeyTokenDomainEntity> keyTokenList) {
        this.keyTokenList = keyTokenList;
    }
}
