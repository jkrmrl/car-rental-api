import { Router } from "express";
import {
  getCars,
  createCarController,
  updateCarController,
} from "../controllers/cars.controllers.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getCars);
router.post("/", authenticateToken, authorizeAdmin, createCarController);
router.patch("/:carId", authenticateToken, authorizeAdmin, updateCarController);

export default router;
