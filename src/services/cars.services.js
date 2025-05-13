import Car from "../models/cars.model.js";

export const getAvailableCars = async () => {
  try {
    const cars = await Car.find({ status: "AVAILABLE" });
    return cars;
  } catch (error) {
    throw error;
  }
};

export const createCarService = async (
  imageData,
  name,
  description,
  pricePerDay
) => {
  try {
    const newCar = new Car({
      image: imageData,
      name,
      description,
      pricePerDay,
    });

    const savedCar = await newCar.save();
    return savedCar;
  } catch (error) {
    throw error;
  }
};
