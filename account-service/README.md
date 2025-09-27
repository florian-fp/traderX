# FINOS | TraderX Sample Trading App | Account Service

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](http://badgen.net/badge/local-dev/supported/green)

## Description

A simple application that exposes CRUD functionality over accounts. This service manages account information and provides validation for trading operations.

## Prerequisites

You will need a running instance of the database. This currently is configured to be a H2 Database running on tcp at the specified host and port.

In this project, you can run the database by running a shell in the [database](../database/README.md) project and running:

```bash
./gradlew build
./run.sh
```

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable Name | Default Value | Description |
| ------------------------- | ------------- | ----------- |
| ACCOUNT_SERVICE_PORT | 18088 | Port for the account service |
| DATABASE_TCP_HOST | localhost | Database host |
| DATABASE_TCP_PORT | 18082 | Database TCP port |
| DATABASE_NAME | traderx | Database name |
| DATABASE_DBUSER | sa | Database username |
| DATABASE_DBPASS | sa | Database password |

Configuration can be found in `application.properties` and can be overridden with environment variables or command line parameters.

## Building

```bash
./gradlew build
```

## Running the Application

```bash
./gradlew bootRun
```

The service runs on port 18088 by default, which can be changed via the `server.port=18088` system property or `ACCOUNT_SERVICE_PORT` environment variable.

## API Documentation

The API documentation is available via:

- JSON format: http://localhost:18088/api-docs
- Swagger UI: http://localhost:18088/swagger-ui.html

## Testing

### Unit Tests

```bash
./gradlew test
```

### Mock Service Testing

You can run a mock of this service by installing `@stoplight/prism-cli`:

```bash
# Only need to do this once for your machine
sudo npm install -g @stoplight/prism-cli
```

Run prism to mock your OpenAPI spec as follows:

```bash
prism --cors --port 18088 mock openapi.yaml
```

You can then try out your requests against the mock service:

```bash
curl -X GET "http://localhost:18088/account/" -H "accept: application/json"
curl -X GET "http://localhost:18088/account/22141" -H "accept: application/json"
```
