package com.ooadproj.application.service.userService;

import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import com.ooadproj.domain.repository.UserDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAuthentication {
    @Autowired
    private UserDomainRepository userDomainRepository;

    public  UserDomainEntity createUser(UserDomainEntity user) {
        return userDomainRepository.save(user);
    }
}
