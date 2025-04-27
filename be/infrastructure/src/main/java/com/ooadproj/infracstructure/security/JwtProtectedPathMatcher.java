package com.ooadproj.infracstructure.security;

import org.springframework.util.AntPathMatcher;

import java.util.List;

public class JwtProtectedPathMatcher {

    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    private static final List<String> protectedPaths = List.of(
            "/api/v1/message/**"
    );

    public static boolean requiresAuthentication(String requestPath) {
        return protectedPaths.stream()
                .anyMatch(pattern -> pathMatcher.match(pattern, requestPath));
    }
}
