# Mentor Pulse

TODO: short introduction what mentor pulse is

## Local Development Setup

TODO: documentation to add for project setup (e.g. how to start with docker)

```
docker compose up --build
```

```
docker compose down -v
```

### Loading Mock Data

TODO: add link to mock data scripts

## Deployment

TODO: add documentation about deployments

### Kubernetes

TODO: add link to kubernetes

### EC2

## Endpoint Documentation

The endpoints are documented using OpenAPI or Swagger schemas:

- [Mentorship Service](/server/mentorshipservice/schema/mentorship-service-schema.json)
- [User Service](/server/userservice/schema/user-service-schema.json)
- [Rating Service](/server/ratingservice/schema/rating-service-schema.json)

- [GenAI Service](/genai/schema/genai-schema.json)

Alternatively, you can also find the endpoints in the controllers of the services (e.g. [MentorProfileController](server/mentorshipservice/src/main/java/com/mentorpulse/mentorshipservice/controller/MentorProfileController.java), [GenAI](genai/controllers/api_controller.py)). Additionally, some are also documented in `.bru` files (see [mentor-pulse-bruno](/docs/mentor-pulse-bruno/)).

## Generating Open API Schemas for Microservices

This is how you can generate schemas for the Java microservices. For [genai](/genai/README.md) the setup is different.

1. Start database via `docker compose up --build postgres-db`.
2. Start service via `docker compose up --build <service-name>` for which you want to generate the schema.
3. Navigate to service that you want to generate the schema for. Execute `./gradlew generateOpenApiDocs` in root
   directory of service. Alternatively, open `http://<endpoint>/v3/api-docs.yaml` in a browser and move the schema to
   the correct folder in the service.
