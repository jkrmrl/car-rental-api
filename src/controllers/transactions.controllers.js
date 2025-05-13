import {
  createPendingTransactionService,
  approveTransactionService,
  getCustomerTransactionsService,
  getAllTransactionsService,
  getTransactionByIdService,
} from "../services/transaction.services.js";

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

export const approveTransactionController = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const adminId = req.user.userId;

    const updatedTransaction = await approveTransactionService(
      transactionId,
      adminId
    );

    res.status(200).json({
      message: "Transaction approved and admin assigned",
      transaction: updatedTransaction,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCustomerTransactionsController = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const transactions = await getCustomerTransactionsService(customerId);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTransactionsController = async (req, res) => {
  try {
    const transactions = await getAllTransactionsService();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionByIdController = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await getTransactionByIdService(transactionId);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
