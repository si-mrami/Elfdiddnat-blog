import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./Routers/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// mongodb connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

// Routes
app.use("/api/auth", authRouter);

// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(30000, () => {
    console.log("Request Timeout");
    res.status(408).send("Request Timeout");
  });
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.code === "ECONNRESET") {
    console.error("Connection reset:", err.message);
    res.status(503).send("Service Unavailable");
  } else {
    console.error("Internal Server Error:", err.stack);
    res.status(500).send("Internal Server Error");
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "ERROR", message: err.message });
});

// Start the server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
