package com.mentorpulse.mentorshipservice.exceptions;

public class NotFoundException extends Exception {
    public NotFoundException(String argumentName) {
        super(String.format("The argument name [%s] is not found", argumentName));
    }
}
