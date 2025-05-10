import { createUser, login } from "../services/users.services.js";

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const token = await createUser(userData);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};
