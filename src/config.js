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

export const MB_TOKEN = process.env.MB_TOKEN;
// lon1,lat1; lon2,lat2; lon3,lat3,.... p.e:  -108.0841801,25.4568621;-108.0835898,25.4521978;-108.070401,25.448571    , %2C   ; %3B
export const MB_URL = "https://api.mapbox.com/directions/v5/mapbox/walking/" +
  "<lon1%2Clat1%3Blon2%2Clat2>" +
  "?alternatives=true&annotations=distance%2Cduration&continue_straight=true&geometries=geojson" +
  "&language=en&overview=full&steps=true&access_token=" + MB_TOKEN