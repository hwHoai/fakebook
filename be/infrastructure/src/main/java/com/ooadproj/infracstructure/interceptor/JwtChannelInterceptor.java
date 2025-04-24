package com.ooadproj.infracstructure.interceptor;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.ooadproj.domain.repository.key.AuthenticationKeyEntityRepository;
import com.ooadproj.infracstructure.persistence.repository.key.JwtTokenServiceImpl;
import com.ooadproj.infracstructure.persistence.repository.key.RSAKeyPairServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAPublicKey;
import java.util.Optional;

@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    @Autowired
    private AuthenticationKeyEntityRepository keyRepository;

    private final JwtTokenServiceImpl jwtTokenService = new JwtTokenServiceImpl();
    private final RSAKeyPairServiceImpl rsaKeyPairService = new RSAKeyPairServiceImpl();

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {
            String token = accessor.getFirstNativeHeader("Authorization");

            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
                DecodedJWT jwt = jwtTokenService.decodeToken(token);
                Long userId = jwt.getClaim("userId").asLong();

                Optional<String> publicKeyStrOpt = keyRepository.findByUserId(userId)
                        .map(k -> k.getPublicKey());

                if (publicKeyStrOpt.isPresent()) {
                    try {
                        RSAPublicKey publicKey = rsaKeyPairService.fromPublicKeyString(publicKeyStrOpt.get());
                        jwtTokenService.verifyToken(publicKey, token);

                        // Gán custom Principal
                        accessor.setUser(new StompPrincipal(userId));

                    } catch (Exception e) {
                        throw new RuntimeException("JWT verification failed", e);
                    }
                } else {
                    throw new RuntimeException("Public key not found for userId: " + userId);
                }
            }
        }

        return message;
    }
}
