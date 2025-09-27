# FINOS | TraderX Sample Trading App | Position Service

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](https://badgen.net/badge/local-dev/supported/green)

## Description

The position service retrieves trades and aggregate positions from the database and returns them to pre-populate a blotter (trades/positions) for a specific accountID. Incremental updates are received in the GUI via the pub-sub trade-feed service.

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
| POSITION_SERVICE_PORT | 18090 | Port for the position service |
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

The service runs on port 18090 by default, which can be changed via the `server.port=18090` system property or `POSITION_SERVICE_PORT` environment variable.

## API Documentation

The API documentation is available via:

- JSON format: http://localhost:18090/api-docs
- Swagger UI: http://localhost:18090/swagger-ui.html

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
prism --cors --port 18090 mock openapi.yaml
```

You can then try out your requests against the mock service:

```bash
curl -X GET "http://localhost:18090/trades/22214" -H "accept: application/json"
curl -X GET "http://localhost:18090/positions/22214" -H "accept: application/json"
```
