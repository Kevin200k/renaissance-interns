// index.js

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// Global Firebase Functions Options
setGlobalOptions({ maxInstances: 10 });

// Initialize Express App
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// 🔁 Routes
const adminRoutes = require("./routes/adminRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes"); // Assuming you renamed one to userRoutes

// 📌 Register routes
app.use("/admin", adminRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/users", userRoutes);

// 🌐 Health Check
app.get("/", (req, res) => {
  logger.info("Health check route hit.");
  res.send("✅ Attendance API is working!");
});

// 📤 Export the Cloud Function
exports.api = onRequest(app);
