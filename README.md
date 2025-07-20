# Mentor Pulse

Mentor Pulse is a dynamic platform designed to bridge the gap between mentors and mentees, fostering meaningful connections that drive personal and professional growth. Whether you're a mentor looking to share your expertise or a mentee seeking guidance, Mentor Pulse makes it easy to find the right match. With features like skill-based pairing and category-specific mentorship, the platform ensures tailored, impactful relationships. Empower your journey with Mentor Pulse—where mentorship meets opportunity.

The application has multiple components:

- [User service](./server/userservice/README.md)
- [Mentorships service](./server/mentorshipservice/README.md)
- [Rating service](./server/ratingservice/README.md)
- [GenAI service](./genai/README.md)
- [Client](./client/README.md)

## Local Development Setup

1. Stop any remaining containers and delete images

```
docker compose down -v
```

2. Start docker compose for local development

```
docker compose up --build
```

### Loading Mock Data

Then you might want to load mock data, to make the application useable. Especially, loading skills and categories is important.
To load mock data for local dev setup go to [server/scripts README](./server/scripts/README.md) and follow instructions.

## Deployment

We have two types of deployments Kubernetes and ec2.

### Kubernetes

Kubernetes deployment can be found [under](./helm/README.md).
For pushes on main we automatically deploy to Kubernetes cluster (see [workflow](.github/workflows/ci-main.yml)).

### EC2

TODO: add ec2 deployment documentation

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
