# FINOS | TraderX Sample Trading App | Database

![DEV Only Warning](https://badgen.net/badge/warning/not-for-production/red) ![Local Dev Machine Supported](http://badgen.net/badge/local-dev/supported/green)

## Introduction

This is designed to play the role of a SQL database that runs standalone as part of an example environment. The other processes in this environment interact with this via SQL / JDBC drivers and therefore this component can be swapped out in other iterations of this environment and replaced with a robust and productionizable RDBMS.

This uses PostgreSQL as a production-ready database server, with configurable authentication, and initializes with the schema defined in initialSchema.sql.

## Default Port Numbers
| Protocol | Port Number |
| :--- | :--- |
| TCP | 18082 |
| PG | 18083 |
| HTTP | 18084 |
 
## Connecting to this database remotely
You can use the `$DATABASE_TCP_PORT` (default 5432) and the database URL in JDBC is `jdbc:postgresql://localhost:5432/traderx`

The default username and password are both *sa*

## Connecting to the web console
You can connect to PostgreSQL using standard PostgreSQL tools like pgAdmin or psql with the connection string `postgresql://postgres:postgres@localhost:5432/traderx`. 

The default username is `postgres` and password is `postgres`

## Using Web Console behind proxy/K8S/Env
By default, the hostname, localhost, 127.0.0.1 are all valid host headers to access the database. If you wish to connect using another IP, or via some proxy/gateway that's set up through K8S or other environment, you will need to specify the hostname your browser is using to access the web console. This is done by setting the environment variable `$DATABASE_WEB_HOSTNAMES` to the hostname you are using to access the web console. This is a comma-delimited list of fully qualified hostnames.

## Output Directory
Data is stored in the local `./_data` directory from where the script is run. This is .gitignore'd 

## Building

This builds in gradle to retrieve PostgreSQL driver.

```shell
$> gradle build
```

## Running on Linux

This is desinged to run on Linux but can easily run on Windows as well. It launches a DB Script runner to pre-populate the database schema- delayed by 20 seconds, and then runs the database server in the foreground.

The database now runs as a PostgreSQL container with configurable environment variables for database name, user, and password.

To launch, all that should be needed is running:
```shell
$> run.sh
```

## Running from your local Win10 Machine

You CAN run this on windows, with the help of Powershell.  All you need to do is have Java on your path, and then enter bash to run the script.  First launch a Terminal/Command Console in Windows.

```
>bash
>$ . run.sh
```

You will see the following output

```

Runing startup script
Web Console server running at http://[your IP]:18084 (others can connect)
finished startup script
TCP server running at tcp://[your IP]:18082 (others can connect)
PG server running at pg://[your IP]:18083 (others can connect)
```

On my windows PC, it actually doesn't work with the public IP address. Just change the above URLs/Host Addresses to use `localhost`  and they work fine.

Example: http://localhost:18084 


## Accessing the Web Console

1. Visit http://localhost:18084 or whatever port you run your service on
2. You should see a web console, prompting you for a username, password, and JDBC URL - Values might not be auto-populated correctly
3. Username should be `postgres`, password should be `postgres`, and you can connect using any PostgreSQL client with the connection string `postgresql://postgres:postgres@localhost:5432/traderx`
4. Click `Connect`
