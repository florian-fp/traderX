# FINOS | TraderX Sample Trading App | Trading Service

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](https://badgen.net/badge/local-dev/supported/green)

## Description

A simple application that accepts new trade requests, validates their account and security, and publishes them onto a trade feed for further processing.

## Prerequisites

This service requires the following components to be running:
- Database service
- Account service (for account validation)
- Reference data service (for security validation)
- Trade feed service (for publishing trades)

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable Name | Default Value | Description |
| ------------------------- | ------------- | ----------- |
| TRADING_SERVICE_PORT | 18092 | Port for the trading service |
| ACCOUNT_SERVICE_URL | http://localhost:18088 | URL for the account service |
| REFERENCE_DATA_SERVICE_URL | http://localhost:18085 | URL for the reference data service |
| TRADE_FEED_ADDRESS | http://localhost:18086 | Address for the trade feed |

You can also use command line arguments:

```bash
./gradlew bootRun --args='--TRADING_SERVICE_PORT=18092'
```

## Building

```bash
./gradlew build
```

## Running the Application

```bash
./gradlew bootRun
```

The service runs on port 18092 by default.

## API Documentation

The API documentation is available via:

- JSON format: http://localhost:18092/api-docs
- Swagger UI: http://localhost:18092/swagger-ui.html

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
prism --cors --port 18092 mock openapi.yaml
```

You can then try out your requests against the mock service:

```bash
curl -X 'POST' \
  'http://localhost:18092/trade/' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "security": "ADBE",
  "quantity": 200,
  "accountID": 22214,
  "side": "Buy"
}'
```
