import Customer from "../models/customers.model.js";
import Car from "../models/cars.model.js";
import Transaction from "../models/transactions.model.js";
import Admin from "../models/admin.model.js";
import { calculateTotalPrice } from "../utils/calculate.utils.js";

export const createPendingTransactionService = async (
  customerId,
  carId,
  startDate,
  endDate,
  modeOfPayment
) => {
  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const car = await Car.findById(carId);
    if (!car) {
      throw new Error("Car not found");
    }

    const existingTransaction = await Transaction.findOne({
      "car._id": carId,
      $or: [
        {
          startDate: { $lte: endDate },
          endDate: { $gte: startDate },
          transactionStatus: { $in: ["PENDING", "APPROVED"] },
        },
      ],
    });

    if (existingTransaction) {
      throw new Error("Car is already booked for the selected dates");
    }

    const amount = car.pricePerDay;
    const totalPrice = calculateTotalPrice(startDate, endDate, amount);

    const newTransaction = new Transaction({
      customer: {
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: customer.address,
        phone: customer.phone,
      },
      car: {
        _id: car._id,
        image: car.image,
        name: car.name,
        description: car.description,
        pricePerDay: car.pricePerDay,
        status: "UNAVAILABLE",
      },
      amount,
      totalPrice,
      startDate,
      endDate,
      modeOfPayment,
    });

    const savedTransaction = await newTransaction.save();

    await Car.findByIdAndUpdate(carId, { status: "UNAVAILABLE" });

    return savedTransaction;
  } catch (error) {
    throw error;
  }
};

export const approveTransactionService = async (transactionId, adminId) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      throw new Error("Admin not found");
    }

    transaction.admin = {
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };
    transaction.transactionStatus = "APPROVED";

    const updatedTransaction = await transaction.save();
    return updatedTransaction;
  } catch (error) {
    throw error;
  }
};

export const getCustomerTransactionsService = async (customerId) => {
  try {
    const transactions = await Transaction.find({ "customer._id": customerId });
    return transactions;
  } catch (error) {
    throw error;
  }
};

export const getAllTransactionsService = async () => {
  try {
    const transactions = await Transaction.find();
    return transactions;
  } catch (error) {
    throw error;
  }
};

export const getTransactionByIdService = async (transactionId) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return transaction;
  } catch (error) {
    throw error;
  }
};
