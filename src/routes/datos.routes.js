import { Router } from "express";
import {
  createAbonado,
  deleteAbonado,
  getAbonado,
  getAbonados,
  updateAbonado,
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

router.patch("/abonado/:telefono", updateAbonado);

export default router;
