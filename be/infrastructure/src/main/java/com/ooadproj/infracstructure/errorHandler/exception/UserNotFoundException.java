package com.ooadproj.infracstructure.errorHandler.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String email) {
        super("Could not find email " + email);
    }
}
