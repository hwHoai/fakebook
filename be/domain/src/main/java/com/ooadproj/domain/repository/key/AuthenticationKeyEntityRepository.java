package com.ooadproj.domain.repository.key;

import com.ooadproj.domain.model.entity.key.AuthenticationKeyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationKeyEntityRepository extends JpaRepository<AuthenticationKeyEntity, Long> {
    AuthenticationKeyEntity save(AuthenticationKeyEntity authenticationKeyEntity);
}
