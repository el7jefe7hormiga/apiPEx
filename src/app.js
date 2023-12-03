import express from "express";
import morgan from "morgan";

import datosRoutes from "./routes/datos.routes.js";
//import mRoutes from "./routes/movimientos.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use("/", indexRoutes);
app.use("/api", [datosRoutes]);

app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada!, (/api/)" });
});

export default app;
