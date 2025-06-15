package com.mentorpulse.mentorshipservice.exceptions;

public class InvalidArgumentsException extends Exception{

    public InvalidArgumentsException(String argument) {
        super(String.format("Argument [%s] is an invalid argument", argument));
    }
}
