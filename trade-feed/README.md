# FINOS | TraderX Sample Trading App | Trade Feed

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](https://badgen.net/badge/local-dev/supported/green)

## Description

This is a simple pub-sub server, meant to be swapped out by your preferred message bus. This simple example allows for simple subscription/unsubscription activities and events to be dispatched into recipient groups, known in [socket.IO](https://socket.io) as 'rooms'. This particular solution was chosen for this demo because it can be expressed simply in a single line of code and natively supports the UI via websockets as well as the 'server side' components of this demo application.

This is not intended to be secure or extremely-high-performance in this simple implementation, but it does the job.

Publish command sends in a JSON object with `{topic:'string', payload: object}` or `{topic:'string', message:string}`. Subscribe/Unsubscribe comes with a string topic.

**NOTE:** This also broadcasts to the '*' topic to allow a global inspector UI to see all traffic. (subscribers of that and the messages' topic will only get one copy)

## Prerequisites

This project assumes that your environment is already configured to use Node.js and npm.

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable Name | Default Value | Description |
| ------------------------- | ------------- | ----------- |
| TRADE_FEED_PORT | 18086 | Port for the trade feed service |
| HOSTNAME | localhost | Hostname for the service |

## Installation

```bash
npm ci
```

## Running the Application

```bash
# development
npm run start

# watch mode (with file watchers for development)
npm run start:dev
```

The service runs on port 18086 by default and will be accessible at http://localhost:18086/.

## Testing

### Unit Tests

```bash
npm test
```

## Development

If you performed the installation and running steps above, you'll see a live-reloading copy of the site open in your browser. You can edit the code and see changes reflected automatically.
