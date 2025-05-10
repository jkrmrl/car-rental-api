import { createUser } from "../services/users.services.js";

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const token = await createUser(userData);
    res
      .status(201)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};
