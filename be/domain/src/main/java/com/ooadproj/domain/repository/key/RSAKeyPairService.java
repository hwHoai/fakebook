package com.ooadproj.domain.repository.key;

import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;

public interface RSAKeyPairService {

    KeyPair generateKeyPair() throws NoSuchAlgorithmException;

    String toPublicKeyString(RSAPublicKey publicKey);

    RSAPublicKey fromPublicKeyString(String publicKey) throws NoSuchAlgorithmException, InvalidKeySpecException;
}
