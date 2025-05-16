package com.ooadproj.domain.model.key;

import lombok.Data;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@Data
@EntityScan
public class JwtToken {
    private String refreshToken;
    private String accessToken;

    public JwtToken(String refreshToken, String accessToken) {
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;

    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
