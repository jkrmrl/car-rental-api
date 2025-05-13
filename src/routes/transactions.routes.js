import { Router } from "express";
import {
  createPendingTransactionController,
  approveTransactionController,
  cancelTransactionController,
  getCustomerTransactionsController,
  getAllTransactionsController,
  getTransactionByIdController,
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
router.patch(
  "/:transactionId/cancel",
  authenticateToken,
  authorizeCustomer,
  cancelTransactionController
);
router.patch(
  "/:transactionId/cancel",
  authenticateToken,
  authorizeAdmin,
  cancelTransactionController
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
router.get("/:transactionId", authenticateToken, getTransactionByIdController);

export default router;
