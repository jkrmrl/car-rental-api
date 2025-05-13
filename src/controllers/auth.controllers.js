import { registerService, loginService } from "../services/auth.services.js";

export const registerController = async (req, res) => {
  try {
    const userData = req.body;
    const token = await registerService(userData);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, type, password } = req.body;
    const token = await loginService(email, type, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
