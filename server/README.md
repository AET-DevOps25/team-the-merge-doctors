## Generating Open API Schemas

1. Start database via `docker compose up --build postgres-db`.
2. Start service via `docker compose up --build <service-name>` for which you want to generate the schema.
3. Navigate to service that you want to generate the schema for. Execute `./gradlew generateOpenApiDocs` in root
   directory of service. Alternatively, open `http://<endpoint>/v3/api-docs.yaml` in a browser and move the schema to
   the correct folder in the service.
