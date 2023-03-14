import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.local` });

export const {
    API_KEY,
    DB_HOST = 'localhost',
    DB_USER = 'movie_user',
    DB_PASSWORD = 'password',
    DB_DATABASE = 'movie_db',
    DB_TABLE = 'movie_table',
} = process.env;

export const DB_PORT = parseInt(process.env.DB_PORT || ('5432' as string));

export const PORT = parseInt(process.env.SERVER_PORT || ('3001' as string));

export const isApiKeyPresent = () => (API_KEY ? true : false);
