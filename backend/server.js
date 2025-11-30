const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to MEAN CRUD API",
    endpoints: {
      "GET /api/tasks": "Get all tasks",
      "POST /api/tasks": "Create a new task",
      "GET /api/tasks/:id": "Get a task by ID",
      "PUT /api/tasks/:id": "Update a task",
      "DELETE /api/tasks/:id": "Delete a task",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
