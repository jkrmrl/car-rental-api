import { getAvailableCars } from "../services/cars.services.js";

export const getCars = async (req, res) => {
  try {
    const cars = await getAvailableCars();
    res.status(200).json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch cars", error: error.message });
  }
};
