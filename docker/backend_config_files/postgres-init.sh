#!/bin/bash
set -e
echo "Using PGDATA=$PGDATA"

# backup existing HBA config
cp "$PGDATA/pg_hba.conf" "$PGDATA/pg_hba.conf.bak"

pg_ctl -D "$PGDATA" reload

psql -v ON_ERROR_STOP=1 <<-EOSQL
    CREATE USER merge_doctor_backend WITH PASSWORD 'qweasdzxc';
    CREATE DATABASE genai_backend WITH OWNER merge_doctor_backend;
    CREATE DATABASE user_backend WITH OWNER merge_doctor_backend;
    CREATE DATABASE rating_backend WITH OWNER merge_doctor_backend;
    CREATE DATABASE mentorship_backend WITH OWNER merge_doctor_backend;
    GRANT ALL PRIVILEGES ON DATABASE genai_backend TO merge_doctor_backend;
    \c genai_backend

    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO merge_doctor_backend;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO merge_doctor_backend;
    GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO merge_doctor_backend;
    GRANT ALL PRIVILEGES ON DATABASE user_backend TO merge_doctor_backend;
    GRANT ALL PRIVILEGES ON DATABASE rating_backend TO merge_doctor_backend;
    GRANT ALL PRIVILEGES ON DATABASE mentorship_backend TO merge_doctor_backend;
EOSQL
