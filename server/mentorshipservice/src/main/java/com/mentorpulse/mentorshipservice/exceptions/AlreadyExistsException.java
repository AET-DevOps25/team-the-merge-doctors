package com.mentorpulse.mentorshipservice.exceptions;

public class AlreadyExistsException extends Exception {

    public <T> AlreadyExistsException(String argumentName, T value) {
        super(String.format("%s is already exist with value [%s]", argumentName, value));
    }
}
