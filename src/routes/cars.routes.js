import { Router } from "express";
import { getCars } from "../controllers/cars.controllers.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, getCars);

export default router;
