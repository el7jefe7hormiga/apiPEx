import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 2553;
export const HOST = process.env.HOST || 'localhost';

export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "aLL";
export const DB_PASSWORD = process.env.DB_PASSWORD || "hormigaLL";
export const DB_DATABASE = process.env.DB_DATABASE || "plantaexterna";
export const DB_PORT = process.env.DB_PORT || 3306;