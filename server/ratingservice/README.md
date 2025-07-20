# Rating Service

The Spring Boot Rating Service allows users to rate mentors and retrieve mentor ratings, providing valuable feedback and helping maintain quality mentorship experiences.

## Tests

Tests the endpoints of this microservice and the services. The tests are run automatically for every [pull request](../../.github/workflows/ci-pull-request.yml) and every [push on main](../../.github/workflows/ci-main.yml) (see [workflow](../../.github/workflows/backend-tests.yml)).

### Run tests locally

Execute the following command to run the tests locally.

```
./gradlew test
```