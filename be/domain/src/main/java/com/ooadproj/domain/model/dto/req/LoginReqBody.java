package com.ooadproj.domain.model.dto.req;

import jakarta.persistence.Entity;
import lombok.Data;

public class LoginReqBody {
    private String userEmail;
    private String phoneNumber;
    private String password;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getPassword() {
        return password;
    }
}
