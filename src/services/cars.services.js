import Car from "../models/cars.model.js";

export const getAvailableCars = async () => {
  try {
    const cars = await Car.find({ status: "AVAILABLE" });
    return cars;
  } catch (error) {
    throw error;
  }
};
