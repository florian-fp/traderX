# FINOS | TraderX Sample Trading App | People Service

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](https://badgen.net/badge/local-dev/supported/green)

## Description

The people service is used for managing users in the system, and associating them with accounts. It provides the following functionality:

- Returns information about a person by logonId or employeeId
- Returns the list of persons whose logonId or fullName contains the search text
- Returns if the logonId or employeeId can be associated to a valid person

## Prerequisites

This project requires .NET Core runtime to be installed on your system.

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable Name | Default Value | Description |
| ------------------------- | ------------- | ----------- |
| PEOPLE_SERVICE_PORT | 18089 | Port for the people service |

## Building

```bash
cd PeopleService.WebApi
dotnet build
```

## Running the Application

```bash
cd PeopleService.WebApi
dotnet run
```

The service runs on port 18089 by default.

## API Documentation

The API documentation is available via:

- Swagger UI: http://localhost:18089/swagger

Example API endpoint:

```
GET /People/GetPerson?LogonId=user01
```

## Testing

### Unit Tests

```bash
dotnet test
```
