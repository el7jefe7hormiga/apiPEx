import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 2553;
export const HOST = process.env.HOST || 'localhost';

export const DB_DATABASE = process.env.DB_DATABASE || "plantaexterna";
export const DB_HOST = process.env.DB_HOST || "aws.connect.psdb.cloud";
export const DB_USER = process.env.DB_USER || "8cn9i2kc3tff0fps6cqt";
export const DB_PASSWORD = process.env.DB_PASSWORD || "pscale_pw_Yk69eq2HHy8eKZXAwk61cLXD664glmeuvKrrw5WraCl";
export const DB_PORT = process.env.DB_PORT || 3306;

