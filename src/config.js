import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 2553;
export const HOST = process.env.HOST || 'https://apiplex.netlify.app';
export const DB_HOST = process.env.DB_HOST || "aws.connect.psdb.cloud";
export const DB_USER = process.env.DB_USER || "81gtbpjckronc7maxosy";
export const DB_PASSWORD = process.env.DB_PASSWORD || "pscale_pw_KTo91sl8Yro6S4YwNtELPEYPgVMOlLn2yDvlKJ22mpw";
export const DB_DATABASE = process.env.DB_DATABASE || "plantaexterna";
export const DB_PORT = process.env.DB_PORT || 3306;
