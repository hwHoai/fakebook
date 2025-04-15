package com.ooadproj.infracstructure.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ooadproj.domain.model.entity.key.AuthenticationKeyEntity;
import com.ooadproj.domain.repository.key.AuthenticationKeyEntityRepository;
import com.ooadproj.infracstructure.persistence.repository.key.RSAKeyPairServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import com.ooadproj.infracstructure.persistence.repository.key.JwtTokenServiceImpl;
import static com.ooadproj.infracstructure.security.JwtProtectedPathMatcher.requiresAuthentication;


import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.util.Collections;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private AuthenticationKeyEntityRepository authenticationKeyEntityRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

//        for (String headerName : Collections.list(request.getHeaderNames())) {
//            System.out.println(headerName + ": " + request.getHeader(headerName));
//        }

        String path = request.getServletPath();

        if (!requiresAuthentication(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = extractTokenFromHeader(request);
        System.out.println("Token: " + token);
        if (token != null) {
            try {
                JwtTokenServiceImpl jwtTokenService = new JwtTokenServiceImpl();
                DecodedJWT decodedJWT = jwtTokenService.decodeToken(token);

                Long userId = decodedJWT.getClaim("userId").asLong();

                // Get publick key from database
                AuthenticationKeyEntity authenticationKeyEntity = authenticationKeyEntityRepository
                        .findByUserId(userId)
                        .orElseThrow(() -> new IllegalArgumentException("Public key not found for userId: " + userId));
                String publicKeyString = authenticationKeyEntity.getPublicKey();

                // Transform public key string to RSAPublicKey
                RSAKeyPairServiceImpl rsaKeyPairService = new RSAKeyPairServiceImpl();
                RSAPublicKey publicKey;

                try {
                    publicKey = rsaKeyPairService.fromPublicKeyString(publicKeyString);
                } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
                    throw new IllegalArgumentException("Invalid public key format", e);
                }

                // Verify the token
                DecodedJWT verifiedToken= jwtTokenService.verifyToken(publicKey, token);

                System.out.println("Token verified: " + verifiedToken);

                // Set the authentication in the security context
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userId.toString(),  // principal
                                null,               // credentials
                                Collections.emptyList() // authorities
                        );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (JWTVerificationException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

