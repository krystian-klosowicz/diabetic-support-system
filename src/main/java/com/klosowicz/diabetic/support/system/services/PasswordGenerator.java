package com.klosowicz.diabetic.support.system.services;

import java.security.SecureRandom;
import java.util.Random;

public class PasswordGenerator {

    private static final String LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String DIGITS = "0123456789";
    private static final String SPECIAL_CHARACTERS = "!@#$%^&*()-_+=<>?";

    private static final String ALL_CHARACTERS = LOWERCASE_CHARACTERS +
            UPPERCASE_CHARACTERS + DIGITS + SPECIAL_CHARACTERS;

    private static final Random random = new SecureRandom();

    public static String generatePassword(int length) {
        StringBuilder password = new StringBuilder();

        // Ensure at least one character from each character set
        password.append(getRandomChar(LOWERCASE_CHARACTERS));
        password.append(getRandomChar(UPPERCASE_CHARACTERS));
        password.append(getRandomChar(DIGITS));
        password.append(getRandomChar(SPECIAL_CHARACTERS));

        // Generate the rest of the password
        for (int i = 4; i < length; i++) {
            password.append(getRandomChar(ALL_CHARACTERS));
        }

        // Shuffle the password characters
        return shuffleString(password.toString());
    }

    private static char getRandomChar(String characterSet) {
        int randomIndex = random.nextInt(characterSet.length());
        return characterSet.charAt(randomIndex);
    }

    private static String shuffleString(String input) {
        char[] characters = input.toCharArray();
        for (int i = characters.length - 1; i > 0; i--) {
            int randomIndex = random.nextInt(i + 1);
            char temp = characters[i];
            characters[i] = characters[randomIndex];
            characters[randomIndex] = temp;
        }
        return new String(characters);
    }
}
