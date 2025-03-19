package com.ooadproj.application.service.userService;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ooadproj.domain.model.entity.key.JwtToken;
import com.ooadproj.domain.repository.UserDomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Date;
import java.util.HashMap;

@Service
public class UserAuthenticationService {
    @Autowired
    private UserDomainRepository userDomainRepository;

    public static KeyPair generateKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        KeyPair keyPair = generator.generateKeyPair();
        return keyPair;
    }

    public static JwtToken generateToken(RSAPublicKey publicKey, RSAPrivateKey privateKey, String userEmail) {
        try {
            Algorithm signAlgorithm = Algorithm.RSA256(privateKey);
            String accessToken = JWT.create()
                    .withIssuer("auth0")
                    .withExpiresAt(new Date(System.currentTimeMillis() + 900000)) // 15 minutes
                    .sign(signAlgorithm);
            String refreshToken = JWT.create()
                    .withIssuer("auth0")
                    .withPayload(new HashMap<String, String>( ){{put("userEmail", userEmail);}})
                    .sign(signAlgorithm);
            Algorithm verifyAlgorithm = Algorithm.RSA256(publicKey);
            DecodedJWT isTokenValid = JWT.require(verifyAlgorithm)
                    .acceptExpiresAt(900000)
                    .build()
                    .verify(accessToken);
            if (isTokenValid == null) {
                throw new JWTVerificationException("Access token is invalid");
            }
            return new JwtToken(refreshToken, accessToken);
        } catch (JWTCreationException exception){
            throw exception;
        }
    }
}
