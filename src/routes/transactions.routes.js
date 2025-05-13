import { Router } from "express";
import {
  createPendingTransactionController,
  approveTransactionController,
  getCustomerTransactionsController,
  getAllTransactionsController,
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
router.get(
  "/",
  authenticateToken,
  authorizeCustomer,
  getCustomerTransactionsController
);
router.get(
  "/all",
  authenticateToken,
  authorizeAdmin,
  getAllTransactionsController
);

export default router;
