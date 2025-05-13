import { Router } from "express";
import {
  createPendingTransactionController,
  approveTransactionController,
} from "../controllers/transactions.controllers.js";
import {
  authenticateToken,
  authorizeCustomer,
  authorizeAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/:carId",
  authenticateToken,
  authorizeCustomer,
  createPendingTransactionController
);
router.patch(
  "/:transactionId",
  authenticateToken,
  authorizeAdmin,
  approveTransactionController
);

export default router;
