import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (payload, options = { expiresIn: "1h" }) => {
  return jwt.sign(payload, JWT_SECRET, options);
};

export default generateToken;
