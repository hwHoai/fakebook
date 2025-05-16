package com.ooadproj.infracstructure.interceptor;

import java.security.Principal;

public class StompPrincipal implements Principal {
    private Long userId;

    public StompPrincipal(Long userId) {
        this.userId = userId;
    }

    @Override
    public String getName() {
        return userId.toString();
    }

    public Long getUserId() {
        return userId;
    }
}
