import app from "./app.js";
import { HOST, PORT, DB_HOST, DB_USER } from "./config.js";

app.listen(PORT);
console.log(`Server on port ${HOST}:${PORT}`);
console.log(`BD connection ${DB_USER} @ ${DB_HOST}`);
