package com.ooadproj.domain.repository.key;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.ooadproj.domain.model.key.JwtToken;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public interface JwtTokenService {
    JwtToken generateToken(RSAPublicKey publicKey, RSAPrivateKey privateKey, String userEmail);
    DecodedJWT verifyToken(RSAPublicKey publicKey, String token);
    DecodedJWT decodeToken(String token);
}
