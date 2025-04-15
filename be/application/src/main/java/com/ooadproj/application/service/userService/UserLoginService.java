package com.ooadproj.application.service.userService;

import com.ooadproj.domain.model.key.JwtToken;
import com.ooadproj.domain.model.entity.key.AuthenticationKeyEntity;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.user.UserEntityRepository;
import com.ooadproj.infracstructure.errorHandler.exception.UserNotFoundException;
import com.ooadproj.infracstructure.persistence.repository.key.JwtTokenServiceImpl;
import com.ooadproj.infracstructure.persistence.repository.key.RSAKeyPairServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Service
public class UserLoginService {
    @Autowired
    private UserEntityRepository userEntityRepository;

    @PreAuthorize("permitAll()")
    public JwtToken loginByEmail(String email,String password) throws NoSuchAlgorithmException {
        // Check if user exists in database
        UserEntity user = userEntityRepository.findByUserEmail(email);
        if(user == null) {
            throw new UserNotFoundException(email, null);
        }

        // Compare password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(16);
        if(!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserNotFoundException(email, null);
        }

        // Generate public and private key pair
        RSAKeyPairServiceImpl rsaKeyPairService = new RSAKeyPairServiceImpl();
        KeyPair keyPair =  rsaKeyPairService.generateKeyPair();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        String publicKeyString = rsaKeyPairService.toPublicKeyString(publicKey);

        // Generate token
        JwtTokenServiceImpl jwtTokenService = new JwtTokenServiceImpl();
        JwtToken tokens =  jwtTokenService.generateToken(publicKey, privateKey, user.getUserEmail(), user.getId());
        System.out.println((tokens.getAccessToken()));

        //Update key in database
        userEntityRepository.updatePublicKeyAndRefreshToken(publicKeyString, tokens.getRefreshToken(), user);
        return  tokens;
    }
}
