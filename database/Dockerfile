FROM postgres:16

# Copy initialization script
COPY initialSchema.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
