package com.ooadproj.domain.model.key;

import java.security.KeyPair;

public class RSAKeyPair {
    private String publicKey;
    private String privateKey;

    public RSAKeyPair(String publicKey, String privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public String getPrivateKey() {
        return privateKey;
    }
}
