import express from "express";
import connectDB from "./config/database.config.js";
import dotenv from "dotenv";
import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

// Connect to the database
connectDB();

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
