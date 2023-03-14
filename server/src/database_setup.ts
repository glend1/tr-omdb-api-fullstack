import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.local` });

const {
    DB_HOST = 'localhost',
    DB_ROOT_USER,
    DB_ROOT_PASSWORD,
    DB_USER = 'movie_user',
    DB_PASSWORD = 'password',
    DB_DATABASE = 'movie_db',
    DB_TABLE = 'movie_table',
} = process.env;

export const DB_PORT = parseInt(process.env.DB_PORT || ('5432' as string));

const main = async () => {
    const client = new Client({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_ROOT_USER,
        password: DB_ROOT_PASSWORD,
    });
    await client.connect();
    await client.query(`CREATE ROLE ${DB_USER} WITH
        LOGIN
        NOSUPERUSER
        NOCREATEDB
        NOCREATEROLE
        INHERIT
        NOREPLICATION
        CONNECTION LIMIT -1
        PASSWORD '${DB_PASSWORD}';`);
    await client.query(`CREATE DATABASE ${DB_DATABASE}
        WITH
        OWNER = ${DB_USER}
        ENCODING = 'UTF8'
        CONNECTION LIMIT = -1
        IS_TEMPLATE = False;`);
    await client.end();
    const db = new Client({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    });
    await db.connect();
    await db.query(`CREATE TABLE public.${DB_TABLE}
        (
            id SERIAL,
            movie_id TEXT UNIQUE,
            PRIMARY KEY (id)
        );`);
    await db.query(`ALTER TABLE IF EXISTS public.${DB_TABLE}
        OWNER to ${DB_USER};`);
    await db.end();
    console.log('Success');
    return;
};

main();
