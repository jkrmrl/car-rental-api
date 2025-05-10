import User from "../models/users.model.js";
import generateToken from "../utils/token.utils.js";
import { hash } from "bcrypt";

export const createUser = async (userData) => {
  try {
    const { password, ...rest } = userData;
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ ...rest, password: hashedPassword });
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
