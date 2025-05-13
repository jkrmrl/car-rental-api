import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    customer: {
      type: {
        _id: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
      },
      required: true,
    },
    admin: {
      type: {
        _id: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    car: {
      type: {
        _id: { type: Schema.Types.ObjectId, required: true },
        image: { type: String },
        name: { type: String, required: true },
        description: { type: String },
        pricePerDay: { type: Number, required: true },
        status: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    modeOfPayment: {
      type: String,
      enum: ["CASH", "DEBIT CARD"],
      required: true,
    },
    transactionStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "CANCELED"],
      default: "PENDING",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
