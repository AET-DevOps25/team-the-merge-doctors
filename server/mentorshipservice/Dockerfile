FROM gradle:8.14-jdk21 AS build

WORKDIR /mentorship-app

COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle

COPY src ./src

RUN gradle bootJar --no-daemon

FROM openjdk:21-jdk-slim

WORKDIR /mentorship-app

COPY --from=build /mentorship-app/build/libs/*.jar app.jar

EXPOSE 8310

ENTRYPOINT sh -c 'java -jar app.jar'
