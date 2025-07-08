# Mentor Pulse

## Endpoint Documentation

The endpoints of the different services are documented either in the controllers of the services (e.g. [MentorProfileController](server/mentorshipservice/src/main/java/com/mentorpulse/mentorshipservice/controller/MentorProfileController.java), [GenAI](genai/controllers/api_controller.py)) or some are also documented in `.bru` files (see [mentor-pulse-bruno](/docs/mentor-pulse-bruno/)).

## Setup

TODO: documentation to add for project setup (e.g. how to start with docker)

## Generating Open API Schemas

1. Start database via `docker compose up --build postgres-db`.
2. Start service via `docker compose up --build <service-name>` for which you want to generate the schema.
3. Navigate to service that you want to generate the schema for. Execute `./gradlew generateOpenApiDocs` in root
   directory of service. Alternatively, open `http://<endpoint>/v3/api-docs.yaml` in a browser and move the schema to
   the correct folder in the service.

