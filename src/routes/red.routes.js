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
router.get("/red/:id", getRed);

// DELETE An Red
router.delete("/red/:id", deleteRed);

// INSERT An Red
router.post("/red", createRed);

// UPDATE AN Red
router.patch("/red/:id", updateRed);

export default router;
