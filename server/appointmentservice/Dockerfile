FROM gradle:8.14-jdk21 AS build

WORKDIR /appointment-app

COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle

COPY src ./src

RUN gradle bootJar --no-daemon

FROM openjdk:21-jdk-slim

WORKDIR /appointment-app

COPY --from=build /appointment-app/build/libs/*.jar app.jar

EXPOSE 8510

ENTRYPOINT sh -c 'java -jar app.jar'
