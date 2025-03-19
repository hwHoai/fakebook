package com.ooadproj.domain.model.entity.key;

import lombok.Data;

@Data
public class JwtToken {
    private String refreshToken;
    private String accessToken;

    public JwtToken(String refreshToken, String accessToken) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;

    }
}
