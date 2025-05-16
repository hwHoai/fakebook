package com.ooadproj.application.service.userService;

import com.ooadproj.application.service.feedService.FeedService;
import com.ooadproj.domain.model.key.JwtToken;
import com.ooadproj.domain.model.entity.key.AuthenticationKeyEntity;
import com.ooadproj.domain.model.entity.user.UserEntity;
import com.ooadproj.domain.repository.user.UserEntityRepository;
import com.ooadproj.domain.repository.key.AuthenticationKeyEntityRepository;
import com.ooadproj.infracstructure.persistence.repository.key.JwtTokenServiceImpl;
import com.ooadproj.infracstructure.persistence.repository.key.RSAKeyPairServiceImpl;
import jakarta.persistence.EntityExistsException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.List;

@Service
public class UserRegisterService {
    @Autowired
    private UserEntityRepository userEntityRepository;

    @Autowired
    private AuthenticationKeyEntityRepository authenticationKeyEntityRepository;

    @Autowired
    private FeedService feedService;

    public JwtToken registerUser(UserEntity user) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, BadRequestException {
        // Check if user email already exists
        String userEmail = user.getUserEmail();
        if (userEntityRepository.existsByUserEmail(userEmail)) {
            throw new EntityExistsException("User with email " + userEmail + " already exists");
        }

        //Hash the password
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(16);
        String hashedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPass);

        // Save user
        new Thread(() -> {
            user.setAvatar("men_default_avatar.JPG");
            userEntityRepository.save(user);
        }).start();

        new Thread(() -> {
            // Push latest feeds to the user
            feedService.pushLatestFeeds(user);
        }).start();

        // Generate public and private key pair
        RSAKeyPairServiceImpl rsaKeyPairService = new RSAKeyPairServiceImpl();
        KeyPair keyPair =  rsaKeyPairService.generateKeyPair();
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();

        // Generate token
        JwtTokenServiceImpl jwtTokenService = new JwtTokenServiceImpl();
        JwtToken tokens = jwtTokenService.generateToken(publicKey, privateKey, user.getId(),userEmail);

        // Save token
        AuthenticationKeyEntity authenticationKeyEntity = new AuthenticationKeyEntity();
        authenticationKeyEntity.setPublicKey(rsaKeyPairService.toPublicKeyString(publicKey));
        authenticationKeyEntity.setRefreshToken(tokens.getRefreshToken());
        authenticationKeyEntity.setUser(user);

        // Save user & token
        authenticationKeyEntityRepository.save(authenticationKeyEntity);

        return tokens;
    }
}
