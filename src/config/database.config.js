import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

export default connectDB;
