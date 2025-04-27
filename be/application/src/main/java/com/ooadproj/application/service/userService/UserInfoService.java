package com.ooadproj.application.service.userService;

import com.ooadproj.domain.model.dto.res.UserPublicInfo;
import com.ooadproj.domain.model.entity.user.UserEntity;
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

    public UserPublicInfo getUserInfoById(Long id) {
        try {
            UserEntity userEntity = userEntityRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            UserPublicInfo userPublicInfo = new UserPublicInfo(userEntity);
            return userPublicInfo;
        } catch (Exception e) {
            throw new RuntimeException("User not found");
        }
    }

    public String getAvatarById(Long id) {
        return userEntityRepository.findById(id)
                .map(UserEntity::getAvatar)
                .orElse(null);
    }
}
