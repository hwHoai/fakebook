package com.ooadproj.domain.repository.key;

import com.ooadproj.domain.model.entity.key.AuthenticationKeyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthenticationKeyEntityRepository extends JpaRepository<AuthenticationKeyEntity, Long> {
    AuthenticationKeyEntity save(AuthenticationKeyEntity authenticationKeyEntity);
    Optional<AuthenticationKeyEntity> findByUserId(Long userId);
}
