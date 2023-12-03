import app from "./app.js";
import { HOST, PORT, DB_HOST } from "./config.js";

app.listen(PORT);
console.log(`Server on port ${HOST}:${PORT}`);
console.log(`BD connection to: ${DB_HOST}`);
