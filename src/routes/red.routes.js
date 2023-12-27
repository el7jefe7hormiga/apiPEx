import { Router } from "express";
import {
  createRed,
  deleteRed,
  getRed,
  getRedes,
  updateRed,
} from "../controllers/red.controller.js";

const router = Router();

// GET todas los reds
router.get("/redes", getRedes);

// GET una Red
router.get("/red/:telefono", getRed);

// DELETE An Red
router.delete("/red/:telefono", deleteRed);

// INSERT An Red
router.post("/red", createRed);

// UPDATE AN Red
router.patch("/red/:telefono", updateRed);

export default router;
