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
    public JwtToken generateToken(RSAPublicKey publicKey, RSAPrivateKey privateKey, Long userId, String userEmail) {
        try {
            Algorithm signAlgorithm = Algorithm.RSA256(privateKey);
            long currentTime = System.currentTimeMillis();

            // Generate Access Token
            String accessToken = JWT.create()
                    .withIssuer("auth0")
                    .withExpiresAt(Instant.ofEpochMilli(currentTime + 900000)) // 15 minutes
                    .withClaim("userId", userId)
                    .withClaim("userEmail", userEmail)
                    .sign(signAlgorithm);

            // Generate Refresh Token
            String refreshToken = JWT.create()
                    .withIssuer("auth0")
                    .withExpiresAt(Instant.ofEpochMilli(currentTime + 259200000)) // 3 days
                    .withClaim("userId", userId)
                    .withClaim("userEmail", userEmail)
                    .sign(signAlgorithm);

            // Verify the Access Token
            if (verifyToken(publicKey, accessToken) == null) {
                throw new JWTVerificationException("Access token is invalid");
            }

            System.out.println("----------Access Token------------- \n " + accessToken);
            System.out.println("----------Refresh Token------------- \n " + refreshToken);

            return new JwtToken(refreshToken, accessToken);
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Access token is invalid");
        }
    }

    public DecodedJWT verifyToken(RSAPublicKey publicKey, String token) {
        try {
            Algorithm verifyAlgorithm = Algorithm.RSA256(publicKey);
            DecodedJWT isTokenValid = JWT.require(verifyAlgorithm)
                    .build()
                    .verify(token);
            System.out.println("Token verified successfully: " + isTokenValid);
            return isTokenValid;
        } catch (JWTVerificationException exception){
            System.out.println("JWT verification error: " + exception.getMessage());
            throw new JWTVerificationException("Access token is invalid");
        }
    }

    public DecodedJWT decodeToken(String token) {
        return JWT.decode(token);
    }
}
