package com.mentorpulse.userservice.utils;

import java.lang.reflect.Field;
import java.util.UUID;

public class PatchUpdater {

    public static <T> void patchUpdate(T target, T source) {
        if (target == null || source == null) {
            return;
        }

        Class<?> clazz = target.getClass();
        while (clazz != null) {
            Field[] fields = clazz.getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                try {
                    Object sourceValue = field.get(source);
                    Object targetValue = field.get(target);

                    if (sourceValue != null) {
                        if (isSimpleValue(field.getType())) {
                            field.set(target, sourceValue);
                        } else {
                            if (targetValue == null) {
                                field.set(target, sourceValue);
                            } else {
                                patchUpdate(targetValue, sourceValue);
                            }
                        }
                    }
                } catch (IllegalAccessException e) {
                    throw new RuntimeException("Failed to update field: " + field.getName(), e);
                }
            }

            clazz = clazz.getSuperclass();
        }
    }

    private static boolean isSimpleValue(Class<?> type) {
        return type.isPrimitive() ||
                type.equals(String.class) ||
                Number.class.isAssignableFrom(type) ||
                type.equals(Boolean.class) ||
                type.equals(java.time.Instant.class) ||
                type.equals(UUID.class) ||
                type.isEnum();
    }
}
