# User Service

The Spring Boot User Service is responsible for managing user login and authentication, ensuring secure access to the platform's features and services.

## Tests

Tests the endpoints of this microservice. The tests are run automatically for every [pull request](../../.github/workflows/ci-pull-request.yml) and every [push on main](../../.github/workflows/ci-main.yml) (see [workflow](../../.github/workflows/backend-tests.yml)).

### Run tests locally

Execute the following command to run the tests locally.

```
./gradlew test
```
