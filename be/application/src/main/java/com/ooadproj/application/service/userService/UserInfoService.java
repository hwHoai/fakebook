package com.ooadproj.application.service.userService;

import com.ooadproj.domain.repository.user.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
    @Autowired
    private UserEntityRepository userEntityRepository;

    public String getUsernameById(Long id) {
        return userEntityRepository.findById(id)
                .map(user -> user.getFirstName() + " " + user.getLastName())
                .orElse(null);
    }
}
