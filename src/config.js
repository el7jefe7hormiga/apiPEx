import { config } from "dotenv";
//import { LOC_DB_DATABASE, LOC_DB_HOST, LOC_DB_USER, LOC_DB_PASSWORD } from "./env.js";
config();

console.log("NODE_ENV", process.env.NODE_ENV)

export const PORT = process.env.PORT || 2553;
export const HOST = process.env.HOST || 'localhost';

export const DB_DATABASE = process.env.DB_DATABASE //|| LOC_DB_DATABASE;
export const DB_HOST = process.env.DB_HOST //|| LOC_DB_HOST;
export const DB_USER = process.env.DB_USER //|| LOC_DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD //|| LOC_DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT || 3306;

