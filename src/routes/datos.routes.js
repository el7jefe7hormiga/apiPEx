import { Router } from "express";
import {
  createAbonado,
  deleteAbonado,
  getAbonado,
  getAbonados,
  updateAbonado,
  getCercanos,
} from "../controllers/datos.controller.js";

const router = Router();

// GET todas los abonados
router.get("/abonados", getAbonados);

// GET una Abonado
router.get("/abonado/:telefono", getAbonado);

// DELETE An Abonado
router.delete("/abonado/:telefono", deleteAbonado);

// INSERT An Abonado
router.post("/abonado", createAbonado);

// UPDATE AN Abonado
router.patch("/abonado/:telefono", updateAbonado);

// GET telefonos cercanos
router.get("/abonado/cercanos/:telefono", getCercanos)

export default router;
