# GoSocial

GoSocial is a social media REST API built with Go and PostgreSQL. It supports user authentication, posts, comments, following, feeds, authorization, rate limiting, caching, and automated testing.

## Features

- User registration, email activation, JWT authentication, and role-based authorization
- Posts, comments, following, and filterable feeds with pagination and sorting
- PostgreSQL persistence with migrations, seeding, and connection pooling
- Optional Redis caching for user lookups
- Fixed-window IP rate limiting, CORS, metrics, and graceful shutdown
- Swagger documentation, automated tests, GitHub Actions CI, and k6 smoke/load tests

## Tech Stack

- Go
- PostgreSQL
- Redis
- Docker and Docker Compose
- JWT
- Swagger
- GitHub Actions
- k6

## API Endpoints

All API routes use the `/v1` prefix.

### Operations

- `GET /v1/health` — health check
- `GET /v1/debug/vars` — application metrics protected by Basic Auth
- `GET /v1/swagger/index.html` — Swagger UI

### Authentication and Users

- `POST /v1/authentication/user` — register a user
- `POST /v1/authentication/token` — generate a JWT
- `PUT /v1/users/activate/{token}` — activate a user
- `GET /v1/users/{userID}` — get a user profile
- `PUT /v1/users/{userID}/follow` — follow a user
- `PUT /v1/users/{userID}/unfollow` — unfollow a user
- `GET /v1/users/feed` — get the authenticated user's feed

### Posts and Comments

- `POST /v1/posts/` — create a post
- `GET /v1/posts/{postID}/` — get a post
- `PATCH /v1/posts/{postID}/` — update a post
- `DELETE /v1/posts/{postID}/` — delete a post
- `POST /v1/posts/{postID}/comments` — create a comment

## Middleware and Security

The server configures:

- Request IDs, request logging, panic recovery, and request timeouts
- CORS and IP-based fixed-window rate limiting
- Bearer JWT authentication for protected routes
- Basic Auth for the metrics endpoint
- Post ownership and role-precedence authorization

## Database and Caching

- PostgreSQL is used for persistent storage.
- Database schema changes are managed with numbered up/down SQL migrations.
- Database seeding is available through `make seed`, and the connection pool is configurable.
- Redis caching is optional and caches user lookups for one minute.

## Backend Practices

- Layered architecture separating HTTP handlers, repositories, and infrastructure concerns
- Repository interfaces, request validation, and context-aware query timeouts
- SQL transactions for registration and email invitation/activation flow
- Optimistic concurrency control for post updates (prevents overwriting newer changes)
- Consistent JSON success and error responses
- Email invitations and account activation through SendGrid

## Running Locally

### Requirements

- Go
- Docker and Docker Compose
- golang-migrate
- k6, if you want to run the smoke or load tests

### Start dependencies

Docker Compose starts PostgreSQL and Redis dependencies. The API is started separately.

```bash
docker compose up -d
```

Configure the required environment variables in `.envrc`. If direnv is not enabled, load them with:

```bash
source .envrc
```

For a local setup, configure at least:

```dotenv
ADDR=:8080
DB_ADDR=postgresql://<user>:<password>@localhost:5432/gosocial?sslmode=disable
ENV=development
REDIS_ENABLED=true
SENDGRID_API_KEY=<sendgrid-api-key>
FROM_EMAIL=<verified-sender-email>
```

`SENDGRID_API_KEY` and `FROM_EMAIL` are needed for email invitations and account activation. When Redis is enabled, `REDIS_ADDR`, `REDIS_PW`, and `REDIS_DB` can also be configured. Set `AUTH_TOKEN_SECRET`, `AUTH_BASIC_USER`, and `AUTH_BASIC_PASS` to non-default values outside local development, and do not commit real secrets.

Then run the database migrations:

```bash
make migrate-up
```

Seed the database if required:

```bash
make seed
```

Start the API:

```bash
go run ./cmd/api
```

## Available Commands

```bash
make test
make migrate-up
make migrate-down
make seed
make gen-docs
```

## Testing

The test suite covers rate limiting, concurrent access, HTTP handlers, and
middleware behavior through an in-memory HTTP server. The k6 scenarios exercise
the health endpoint with smoke and ramp/load traffic.

```bash
go test ./...
go test -race ./...
k6 run scripts/k6/k6_smoke.js
k6 run scripts/k6/k6_test.js
```

## Continuous Integration

GitHub Actions verifies dependencies, builds the project, runs `go vet`,
`staticcheck`, and executes the full test suite with the race detector.

## Release Automation

- Release Please automates changelog-based release preparation.
- The API version is updated automatically from the latest changelog version.

The project does not currently include automatic deployment to a cloud environment.

## API Documentation

Swagger documentation is available in the `docs` directory.

When the API is running, visit:

```text
http://localhost:8080/v1/swagger/index.html
```

## Project Structure

```text
cmd/
  api/              HTTP server and handlers
  migrate/          Database migrations and seeding

internal/
  auth/             JWT authentication
  db/               Database connection and seeding
  env/              Environment configuration
  mailer/           Email delivery
  ratelimiter/      Request rate limiting
  store/            PostgreSQL repositories
  store/cache/      Redis cache implementation

scripts/
  k6/               k6 smoke and load tests

docs/               Swagger documentation
```

## Independent Contributions

- Identified and fixed a TOCTOU race condition in the fixed-window rate limiter.
- Added concurrent regression tests to reproduce and verify the fix.
- Added k6 smoke and load tests to validate basic API behavior and request latency.
- Fixed authenticated user attribution for feed and comment operations.
- Implemented a custom client-IP extraction helper for the rate limiter to better handle trusted proxy/CDN deployments and keep request throttling grounded in the client address.