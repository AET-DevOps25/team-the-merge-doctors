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

#### Overview

This project uses GitHub Actions, Terraform, and Ansible to provision an EC2 instance, configure it, and deploy the app stack (via Docker Compose) on AWS.
All infra-as-code and automation is in infra/.

#### Triggering Deployment

Deployment is triggered manually via the GitHub Actions workflow:
.github/workflows/aws-ec2-deploy.yml

You provide:

* SSH private key (base64)
* AWS credentials (access key, secret, session token)
* GHCR (GitHub Container Registry) token

#### Workflow Steps

a. **Checkout & Secrets**
Repo is checked out.
Secrets are masked for safety.
SSH key is decoded and saved as infra/priv.pem.

b. **Tooling Setup**
Installs Terraform (v1.12.1) and Ansible (v11.6.0).

c. **Deploying EC2 (Terraform)**
Runs make deploy in infra/:
Applies main.tf to create a new EC2 instance (Debian, public IP, SSH open, HTTP/HTTPS open).
Security group allows ports 22, 80, 443 from anywhere.
Waits for the instance to be reachable via SSH.

d. **Inventory Update**
Extracts the new EC2 public IP and injects it into the Ansible inventory (inventory.ini).

e. **SSH Test**
Verifies SSH connectivity to the new instance using the provided key.

f. **Provisioning (Ansible)**
Runs make ansible in infra/:
Executes playbook.yml against the new EC2 instance.
Installs Docker, Docker Compose, Python, pip, etc.
Logs into GHCR to pull images.
Copies all needed config files, secrets, and scripts.
Writes the EC2 public IP to .env.production (for Traefik/public routing).
Copies and sets up backend config, monitoring, and mock data scripts.
Runs Docker Compose (compose.aws.yml) to start all services (Traefik, app services, Postgres, monitoring, etc).
Waits for Traefik to be up, then loads mock users and profiles via scripts.

#### Result

The EC2 instance is fully provisioned, running all services via Docker Compose, with Traefik as the reverse proxy.
All services are accessible via the EC2 public IP (HTTP/HTTPS, depending on your compose config).
Monitoring (Prometheus, Grafana) and mock data are loaded and ready.
You can access the website by using the public ip of your deployed ec2,
Access monitoring by {ec2.public\_ip/prometheus}  {ec2.public\_ip/grafana}

#### Files of Interest

infra/main.tf — Terraform infra definition (EC2, security group)
infra/playbook.yml — Ansible provisioning and deployment
infra/compose.aws.yml — Docker Compose stack (all services)
.github/workflows/aws-ec2-deploy.yml — GitHub Actions workflow for automation


Push the button in GitHub Actions, provide secrets, and the workflow will spin up a new EC2, configure it, and deploy the full stack automatically.

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
