import express from "express";
import connectDB from "./config/database.config.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import carRoutes from "./routes/cars.routes.js";
import transactionRoutes from "./routes/transactions.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// Connect to the database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
