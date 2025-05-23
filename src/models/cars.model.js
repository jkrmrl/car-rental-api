import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "UNAVAILABLE", "MAINTENANCE"],
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
