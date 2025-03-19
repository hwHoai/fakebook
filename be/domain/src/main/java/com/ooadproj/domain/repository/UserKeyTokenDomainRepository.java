package com.ooadproj.domain.repository;

import com.ooadproj.domain.model.entity.key.UserKeyTokenDomainEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserKeyTokenDomainRepository extends JpaRepository<UserKeyTokenDomainEntity, Long> {
    UserKeyTokenDomainEntity save(UserKeyTokenDomainEntity userKeyTokenDomainEntity);
}
