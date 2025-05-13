import { createPendingTransactionService } from "../services/transaction.services.js";

export const createPendingTransactionController = async (req, res) => {
  try {
    const { carId } = req.params;
    const { startDate, endDate, modeOfPayment } = req.body;
    const customerId = req.user.userId;

    const newTransaction = await createPendingTransactionService(
      customerId,
      carId,
      startDate,
      endDate,
      modeOfPayment
    );

    res.status(201).json({
      message: "Pending transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
