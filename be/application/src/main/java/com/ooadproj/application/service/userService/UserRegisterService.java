package com.ooadproj.application.service.userService;

import com.ooadproj.domain.model.entity.key.JwtToken;
import com.ooadproj.domain.model.entity.key.UserKeyTokenDomainEntity;
import com.ooadproj.domain.model.entity.user.UserDomainEntity;
import com.ooadproj.domain.repository.UserDomainRepository;
import com.ooadproj.domain.repository.UserKeyTokenDomainRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;
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
import java.util.Base64;
import java.util.List;

@Service
public class UserRegisterService {
    @Autowired
    private UserDomainRepository userDomainRepository;

    @Autowired
    private UserKeyTokenDomainRepository userKeyTokenDomainRepository;

    @Transactional
    public JwtToken registerUser(UserDomainEntity user) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException, BadRequestException {
        System.out.println("Registering user: " + user);
        if(user == null) {
            throw new BadRequestException("User cannot be null");
        }
        // Check if user email already exists
        UserDomainEntity isUserEmailExists = userDomainRepository.findByUserEmail(user.getUserEmail());
        if (isUserEmailExists != null) {
            throw new EntityExistsException("User with email " + user.getUserEmail() + " already exists");
        }

        //Hash the password
        BCryptPasswordEncoder PasswordEncoder = new BCryptPasswordEncoder(16);
        String hashedPass = PasswordEncoder.encode(user.getPassword());
        user.setPassword(hashedPass);

        // Save user
        new Thread(() -> {
            userDomainRepository.save(user);
        }).start();

        // Generate public and private key pair
        KeyPair keyPair =  UserAuthenticationService.generateKeyPair();
        String publicKey = Base64.getMimeEncoder().encodeToString( keyPair.getPublic().getEncoded());
        String privateKey = Base64.getMimeEncoder().encodeToString( keyPair.getPrivate().getEncoded());
        System.out.println("----------Private Key------------- \n " + publicKey);
        System.out.println("----------Public Key--------------- \n" + privateKey);

        // Generate token
        JwtToken tokens = UserAuthenticationService.generateToken((RSAPublicKey) keyPair.getPublic(), (RSAPrivateKey) keyPair.getPrivate(), user.getUserEmail());
        System.out.println("----------Access Token------------- \n " + tokens.getAccessToken());
        System.out.println("----------Refresh Token------------- \n " + tokens.getRefreshToken());

        // Save token
        UserKeyTokenDomainEntity userKeyTokenDomainEntity = new UserKeyTokenDomainEntity();
        userKeyTokenDomainEntity.setPublicKey(publicKey);
        userKeyTokenDomainEntity.setRefreshToken(tokens.getRefreshToken());
        userKeyTokenDomainEntity.setUser(user);

        // Save user & token
        userKeyTokenDomainRepository.save(userKeyTokenDomainEntity);

        return tokens;
    }

    public List<UserDomainEntity> findAll() {
        return userDomainRepository.findAll();
    }
}
