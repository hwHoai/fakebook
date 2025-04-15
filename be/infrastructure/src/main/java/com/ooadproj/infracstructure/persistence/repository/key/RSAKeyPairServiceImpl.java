package com.ooadproj.infracstructure.persistence.repository.key;

import com.ooadproj.domain.repository.key.RSAKeyPairService;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
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

    @Override
    public RSAPublicKey fromPublicKeyString(String publicKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        String cleaned = publicKey
                .replaceAll("\\n", "")
                .replaceAll("\\r", "")
                .replaceAll("\\s", "");
        byte[] decoded = Base64.getDecoder().decode(cleaned);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(decoded);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return (RSAPublicKey) keyFactory.generatePublic(spec);
    }

}
