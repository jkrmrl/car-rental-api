import { Router } from "express";
import {
  getCars,
  createCarController,
} from "../controllers/cars.controllers.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getCars);
router.post("/", authenticateToken, authorizeAdmin, createCarController);

export default router;
