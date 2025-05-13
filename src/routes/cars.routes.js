import { Router } from "express";
import {
  getCars,
  createCarController,
  updateCarController,
  deleteCarController,
} from "../controllers/cars.controllers.js";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getCars);
router.post("/", authenticateToken, authorizeAdmin, createCarController);
router.patch("/:carId", authenticateToken, authorizeAdmin, updateCarController);
router.delete(
  "/:carId",
  authenticateToken,
  authorizeAdmin,
  deleteCarController
);

export default router;
