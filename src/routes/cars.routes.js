import { Router } from "express";
import {
  createCarController,
  updateCarController,
  deleteCarController,
  getAvailableCarsController,
  getAllCarsController,
} from "../controllers/cars.controllers.js";
import {
  authenticateToken,
  authorizeAdmin,
  authorizeCustomer,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorizeCustomer,
  getAvailableCarsController
);
router.get("/all", authenticateToken, authorizeAdmin, getAllCarsController);
router.post("/", authenticateToken, authorizeAdmin, createCarController);
router.patch("/:carId", authenticateToken, authorizeAdmin, updateCarController);
router.delete(
  "/:carId",
  authenticateToken,
  authorizeAdmin,
  deleteCarController
);

export default router;
