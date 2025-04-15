package com.ooadproj.infracstructure.persistence.repository.key;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ooadproj.domain.model.key.JwtToken;
import com.ooadproj.domain.repository.key.JwtTokenService;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;

public class JwtTokenServiceImpl implements JwtTokenService {

    @Override
    public JwtToken generateToken(RSAPublicKey publicKey, RSAPrivateKey privateKey, String userEmail, long userId) {
        try {
            Algorithm signAlgorithm = Algorithm.RSA256(privateKey);
            long currentTime = System.currentTimeMillis();
            String accessToken = JWT.create()
                    .withIssuer("auth0")
                    .withExpiresAt(Instant.ofEpochSecond(currentTime + 900000)) // 15 minutes
                    .withPayload(new HashMap<String, String>( ){{put("userEmail", userEmail); put("userId", String.valueOf(userId));}})
                    .sign(signAlgorithm);
            String refreshToken = JWT.create()
                    .withIssuer("auth0")
                    .withPayload(new HashMap<String, String>( ){{put("userEmail", userEmail); put("userId", String.valueOf(userId));}})
                    .withExpiresAt(Instant.ofEpochSecond(currentTime + 259200000)) // 3 days
                    .sign(signAlgorithm);
            System.out.println(currentTime + 900000);
            System.out.println(currentTime + 259200000);
            if (verifyToken(publicKey, accessToken) == null) {
                throw new JWTVerificationException("Access token is invalid");
            }
            System.out.println("----------Access Token------------- \n " + accessToken);
            System.out.println("----------Refresh Token------------- \n " + refreshToken);
            return new JwtToken(refreshToken, accessToken);
        } catch (JWTVerificationException exception){
            throw new JWTVerificationException("Access token is invalid");
        }
    }

    public DecodedJWT verifyToken(RSAPublicKey publicKey, String token) {
        try {
            Algorithm verifyAlgorithm = Algorithm.RSA256(publicKey);
            DecodedJWT isTokenValid = JWT.require(verifyAlgorithm)
                    .build()
                    .verify(token);
            return isTokenValid;
        } catch (JWTVerificationException exception){
            throw new JWTVerificationException("Access token is invalid");
        }
    }
}
