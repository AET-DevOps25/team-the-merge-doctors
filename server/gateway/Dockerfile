# Stage 1: Build the application
FROM gradle:8.14-jdk21 AS build

# Set working directory
WORKDIR /gateway-app

# Copy gradle configuration files
COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle

# Copy source code
COPY src ./src

# Build the application
RUN gradle bootJar --no-daemon

# Stage 2: Run the application
FROM openjdk:21-jdk-slim

WORKDIR /gateway-app

# Copy the built JAR file from the build stage
COPY --from=build /gateway-app/build/libs/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8610

# Command to run the application
ENTRYPOINT sh -c 'java -jar app.jar'
