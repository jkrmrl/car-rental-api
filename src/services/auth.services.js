import Customer from "../models/customers.model.js";
import generateToken from "../utils/token.utils.js";
import { hash, compare } from "bcrypt";

export const registerService = async (userData) => {
  try {
    const { password, ...rest } = userData;
    const hashedPassword = await hash(password, 10);
    const newUser = new Customer({ ...rest, password: hashedPassword });
    const savedUser = await newUser.save();
    const tokenPayload = {
      userId: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      phone: savedUser.phone,
      address: savedUser.address,
      type: savedUser.type,
    };
    const token = generateToken(tokenPayload);
    return token;
  } catch (error) {
    throw error;
  }
};

export const loginService = async (email, type, password) => {
  try {
    let user;
    let tokenPayload;

    if (type === "ADMIN") {
      user = await Admin.findOne({ email });
      if (!user) {
        throw new Error("Invalid admin credentials");
      }
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid admin credentials");
      }
      tokenPayload = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
      };
      const token = generateToken(tokenPayload);
      return { message: "Admin login successful", token };
    } else {
      user = await Customer.findOne({ email });
      if (!user) {
        throw new Error("Invalid customer credentials");
      }
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid customer credentials");
      }
      tokenPayload = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        type: user.type,
      };
      const token = generateToken(tokenPayload);
      return { message: "Customer login successful", token };
    }
  } catch (error) {
    throw error;
  }
};
