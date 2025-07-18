plugins {
	java
	id("org.springframework.boot") version "3.5.0"
	id("io.spring.dependency-management") version "1.1.7"
	id("org.springdoc.openapi-gradle-plugin") version "1.7.0"
}

group = "com.mentorpulse"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("io.jsonwebtoken:jjwt-api:0.12.6")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.6")
	implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0")

	annotationProcessor("org.hibernate.orm:hibernate-jpamodelgen")
	runtimeOnly("org.postgresql:postgresql:42.7.7")

	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")

	testImplementation("com.h2database:h2")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("org.springframework.boot:spring-boot-test-autoconfigure")

	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

// Used for local development only
openApi {
	apiDocsUrl.set("http://localhost:8310/v3/api-docs")
	outputDir.set(file("$projectDir/schema"))
	outputFileName.set("mentorship-service-schema.json")

	customBootRun {
		environment = mapOf("SPRING_PROFILES_ACTIVE" to "dev")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
