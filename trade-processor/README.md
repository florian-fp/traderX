# FINOS | TraderX Sample Trading App | Trade Processor

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](https://badgen.net/badge/local-dev/supported/green)

## Description

A simple application that subscribes to trade-feed pubsub engine, and 'processes' trades. This initially stores them in the database as pending trades and marks them as processed, reporting each phase change on the appropriate trade-feed as a notification. As trades are settled, it also recalculates any position changes and persists and broadcasts those changes as well.

## Prerequisites

This service requires the following components to be running:
- Database service
- Trade feed service (for subscribing to trade events)

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable Name | Default Value | Description |
| ------------------------- | ------------- | ----------- |
| TRADE_PROCESSOR_SERVICE_PORT | 18091 | Port for the trade processor service |
| TRADE_FEED_ADDRESS | http://localhost:18086 | URL for the trade feed service |
| DATABASE_URL | jdbc:h2:tcp://localhost:18082/traderx | Database connection URL |
| DATABASE_USERNAME | sa | Database username |
| DATABASE_PASSWORD | sa | Database password |

The easiest way to reconfigure the application is by editing properties in `src/main/resources/application.properties`.

You can also use command line arguments:

```bash
./gradlew bootRun --args='--server.port=18091'
./gradlew bootRun --args='--trade.feed.address=http://localhost:18086'
```

You can see all configuration details in [src/main/resources/application.properties](src/main/resources/application.properties).

## Building

```bash
./gradlew build
```

## Running the Application

```bash
./gradlew bootRun
```

The service runs on port 18091 by default.

## Testing

### Unit Tests

```bash
./gradlew test
```
