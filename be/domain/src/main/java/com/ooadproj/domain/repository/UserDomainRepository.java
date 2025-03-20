package com.ooadproj.domain.repository;

import com.ooadproj.domain.model.entity.key.UserKeyTokenDomainEntity;
import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDomainRepository extends JpaRepository<UserDomainEntity, Long> {

    UserDomainEntity findByUserEmail(String userEmail);
    UserDomainEntity save(UserDomainEntity userDomainEntity);
}
