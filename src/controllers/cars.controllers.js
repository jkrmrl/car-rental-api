import {
  getAvailableCarsService,
  getAllCarsService,
  createCarService,
  updateCarService,
  deleteCarService,
} from "../services/cars.services.js";

export const getAvailableCarsController = async (req, res) => {
  try {
    const cars = await getAvailableCarsService();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCarsController = async (req, res) => {
  try {
    const cars = await getAllCarsService();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCarController = async (req, res) => {
  try {
    const { image, name, description, pricePerDay } = req.body;

    if (!image || !name || !description || !pricePerDay) {
      return res
        .status(400)
        .json({ message: "Please provide all required car details." });
    }

    const newCar = await createCarService(
      image,
      name,
      description,
      pricePerDay
    );

    res.status(201).json({ message: "Car created successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCarController = async (req, res) => {
  try {
    const { carId } = req.params;

    const updateData = req.body;

    const updatedCar = await updateCarService(carId, updateData);
    res
      .status(200)
      .json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCarController = async (req, res) => {
  try {
    const { carId } = req.params;

    const result = await deleteCarService(carId);

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
