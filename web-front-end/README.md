# FINOS | TraderX Sample Trading App | Web Front End

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](https://badgen.net/badge/local-dev/supported/green)

## Description

The Web Front End provides a UI for users to select an account, view trades and positions, initiate new trades, and to administer the accounts themselves.

This component includes two different implementations:
- **Angular**: Full-featured implementation with account management capabilities
- **React**: Contributed during a hack day, works for executing trades and viewing the blotter (may not work for managing accounts)

## Prerequisites

This project assumes that your environment is already configured to use Node.js and npm.

The following backend services need to be running:
- Position service (for trade and position blotters)
- Trade feed service (for incremental updates via subscription)
- Account service (for account selection and management)
- Reference data service (for security resolution)
- Trade service (for trade submission)
- People service (for user resolution in account management)

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable Name | Default Value | Description |
| ------------------------- | ------------- | ----------- |
| WEB_SERVICE_ANGULAR_PORT | 18093 | Port for the Angular web service |
| WEB_SERVICE_REACT_PORT | 18094 | Port for the React web service |

## Installation

### Angular Implementation

```bash
cd angular
npm install
```

### React Implementation

```bash
cd react
npm install
```

## Running the Application

### Angular Implementation

```bash
cd angular
npm start
```

The Angular application will be available at http://localhost:18093.

### React Implementation

```bash
cd react
npm start
```

The React application will be available at http://localhost:18094.

## Building for Production

### Angular Implementation

```bash
cd angular
npm run build
```

### React Implementation

```bash
cd react
npm run build
```

## Testing

### Angular Implementation

```bash
cd angular
npm test
```

### React Implementation

```bash
cd react
npm test
```

## Service Dependencies

- **Position Service**: For querying trades and positions to populate blotters
- **Trade Feed**: For subscribing to account-specific incremental updates
- **Account Service**: For account selection and account management operations
- **Reference Data Service**: For resolving security ticker symbols
- **Trade Service**: For submitting trade requests for execution
- **People Service**: For resolving users when managing account associations
