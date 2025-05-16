package com.ooadproj.infracstructure.errorHandler.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String email, String phoneNumber) {
        super("Could not find " + (email.equals(null) ? "phoneNumber: " + phoneNumber : "email: " + email));
    }
}
