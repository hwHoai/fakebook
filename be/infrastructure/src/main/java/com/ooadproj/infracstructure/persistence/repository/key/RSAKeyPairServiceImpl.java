package com.ooadproj.infracstructure.persistence.repository.key;

import com.ooadproj.domain.repository.key.RSAKeyPairService;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;

public class RSAKeyPairServiceImpl implements RSAKeyPairService {

    private  RSAKeyPairServiceImpl instance;

    public RSAKeyPairServiceImpl getRSAKeyPairService() {
        if (instance == null) {
            instance = new RSAKeyPairServiceImpl();
        }
        return instance;
    }

    @Override
    public KeyPair generateKeyPair() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        KeyPair keyPair = generator.generateKeyPair();
        return keyPair;
    }

    @Override
    public String toPublicKeyString(RSAPublicKey publicKey) {
        String publicKeyString = Base64.getMimeEncoder().encodeToString( publicKey.getEncoded());
        System.out.println("----------Public Key--------------- \n" + publicKeyString);
        return publicKeyString;
    }

}
