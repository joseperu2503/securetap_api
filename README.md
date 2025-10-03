# SecureTap API

### Environments

```bash
cp .env.example .env.dev
cp .env.example .env.prod
cp .env.example .env.staging
```

```bash
nano .env.dev
nano .env.prod
nano .env.staging
```

## Start all services in development mode with Docker:

```bash
docker compose -f docker-compose.dev.yml --env-file .env.dev -p securetap_api_dev up --build
```

## Run the API in detached, production-ready mode:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod -p securetap_api_prod up -d --build
```

## Run the API in detached, staging-ready mode:

```bash
docker compose -f docker-compose.staging.yml --env-file .env.staging -p securetap_api_staging up -d --build
```
