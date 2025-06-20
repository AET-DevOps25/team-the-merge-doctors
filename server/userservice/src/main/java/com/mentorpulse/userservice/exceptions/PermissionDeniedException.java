package com.mentorpulse.userservice.exceptions;

public class PermissionDeniedException extends Exception {

    public PermissionDeniedException(String message) {
        super(message);
    }
}
