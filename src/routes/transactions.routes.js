import { Router } from "express";
import { createPendingTransactionController } from "../controllers/transactions.controllers.js";
import {
  authenticateToken,
  authorizeCustomer,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/:carId",
  authenticateToken,
  authorizeCustomer,
  createPendingTransactionController
);

export default router;
