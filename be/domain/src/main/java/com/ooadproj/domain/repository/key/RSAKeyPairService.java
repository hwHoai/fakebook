package com.ooadproj.domain.repository.key;

import java.security.KeyPair;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;

public interface RSAKeyPairService {

    KeyPair generateKeyPair() throws NoSuchAlgorithmException;

    String toPublicKeyString(RSAPublicKey publicKey);

}
