# People Service (Node.js)

This is the Node.js/NestJS implementation of the People Service, migrated from the original .NET Core version.

## Overview

The People Service provides directory functionality for the TraderX application, allowing users to:
- Look up people by logon ID or employee ID
- Search for people by name or logon ID
- Validate person existence

## API Endpoints

- `GET /People/GetPerson?LogonId=user01` - Get a specific person
- `GET /People/GetMatchingPeople?SearchText=alice` - Search for people
- `GET /People/ValidatePerson?LogonId=user01` - Validate person exists

## Running the Service

### Development
```bash
npm install
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Docker
```bash
docker build -t people-service .
docker run -p 18089:18089 people-service
```

## Configuration

- `PEOPLE_SERVICE_PORT`: Port to run the service on (default: 18089)
- `NODE_ENV`: Environment mode (development/production)

## Data Source

The service loads people data from `data/people.json` at startup. The data is cached in memory for performance.

## Migration Notes

This service was migrated from .NET Core to Node.js/NestJS to standardize the technology stack. It maintains full API compatibility with the original implementation.
