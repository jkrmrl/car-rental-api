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

export const updateCarService = async (carId, updateData) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedCar) {
      throw new Error(`Car with ID ${carId} not found`);
    }
    return updatedCar;
  } catch (error) {
    throw error;
  }
};

export const deleteCarService = async (carId) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) {
      throw new Error(`Car with ID ${carId} not found`);
    }
    return { message: `Car with ID ${carId} deleted successfully` };
  } catch (error) {
    throw error;
  }
};
