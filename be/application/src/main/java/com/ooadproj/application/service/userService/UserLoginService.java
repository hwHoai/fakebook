package com.ooadproj.application.service.userService;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.ooadproj.application.service.feedService.FeedService;
import com.ooadproj.domain.model.key.JwtToken;
import com.ooadproj.domain.model.entity.key.AuthenticationKeyEntity;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.key.AuthenticationKeyEntityRepository;
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
    @Autowired
    private FeedService feedService;
    @Autowired
    private AuthenticationKeyEntityRepository authenticationKeyEntityRepository;

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

        new Thread(() -> {
            // Push latest feeds to the user
            feedService.pushLatestFeeds(user);
        }).start();

        // Generate public and private key pair
        RSAKeyPairServiceImpl rsaKeyPairService = new RSAKeyPairServiceImpl();
        KeyPair keyPair =  rsaKeyPairService.generateKeyPair();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        String publicKeyString = rsaKeyPairService.toPublicKeyString(publicKey);

        // Generate token
        JwtTokenServiceImpl jwtTokenService = new JwtTokenServiceImpl();
        JwtToken tokens =  jwtTokenService.generateToken(publicKey, privateKey,user.getId(), user.getUserEmail());
        System.out.println((tokens.getAccessToken()));

        //Update key in database
        userEntityRepository.updatePublicKeyAndRefreshToken(publicKeyString, tokens.getRefreshToken(), user);
        return  tokens;
    }

    @PreAuthorize("permitAll()")
    public JwtToken renewToken (String refreshToken) throws Exception {
        // check if refresh token is valid
        AuthenticationKeyEntity authenticationKeyEntity = authenticationKeyEntityRepository.findByRefreshToken(refreshToken);
        System.out.println("renewToken" + authenticationKeyEntity);
        if(authenticationKeyEntity == null) {
            throw new Exception("Refresh token not found");
        }

        // Verify refresh token
        RSAKeyPairServiceImpl rsaKeyPairService = new RSAKeyPairServiceImpl();
        JwtTokenServiceImpl jwtTokenService = new JwtTokenServiceImpl();
        RSAPublicKey publicKey = rsaKeyPairService.fromPublicKeyString(authenticationKeyEntity.getPublicKey());
        DecodedJWT decodedJWT = jwtTokenService.verifyToken(publicKey, refreshToken);
        if(decodedJWT == null) {
            throw new Exception("Decoded JWT is null");
        }

        // Generate new token
        KeyPair keyPair = rsaKeyPairService.generateKeyPair();
        RSAPublicKey newPublicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey newPrivateKey = (RSAPrivateKey) keyPair.getPrivate();
        String newPublicKeyString = rsaKeyPairService.toPublicKeyString(newPublicKey);
        JwtToken newTokens = jwtTokenService.generateToken(newPublicKey, newPrivateKey, authenticationKeyEntity.getUser().getId(), authenticationKeyEntity.getUser().getUserEmail());
        userEntityRepository.updatePublicKeyAndRefreshToken(newPublicKeyString, newTokens.getRefreshToken(), authenticationKeyEntity.getUser());
        System.out.println(" newPublicKeyString" + newPublicKeyString + " newTokens.getRefreshToken()" + newTokens.getRefreshToken());
        return  newTokens;
    }
}
