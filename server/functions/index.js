// const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");
// const admin = require("firebase-admin");

// admin.initializeApp();
// const db = admin.firestore();

// const app = express();

// app.use(cors({ origin: true }));
// app.use(express.json());

// // Routes Logging
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// // Import Routes
// const adminRoutes = require("./routes/adminRoutes");
// const attendanceRoutes = require("./routes/attendanceRoutes");
// const userRoutes = require("./routes/userRoutes");
// const flaggedRoutes = require("./routes/flaggedRoutes");
// const flaggedUserRoutes = require("./routes/flaggedUserRoutes");
// const locationRoutes = require("./routes/locationRoutes");

// // Use Routes
// app.use("/admin", adminRoutes);
// app.use("/attendance", attendanceRoutes);
// app.use("/flagged-attendance", flaggedRoutes);
// app.use("/users", userRoutes);
// app.use("/flagged-users", flaggedUserRoutes);
// app.use("/locations", locationRoutes);

// // Health Check
// app.get("/", (req, res) => {
//   res.send("✅ Attendance API is working!");
// });

// // Export Express App as Firebase Function (v1 syntax)
// exports.api = functions.https.onRequest(app);

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json"); // <-- You'll need to download this from Firebase Console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Initialize Express App
const app = express();
const PORT = 5000; // You can choose any port

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Frontend URL
app.use(express.json());


// Import routes
const adminRoutes = require("./routes/adminRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes");
const flaggedRoutes = require("./routes/flaggedRoutes");
const flaggedUserRoutes = require("./routes/flaggedUserRoutes");
const locationRoutes = require("./routes/locationRoutes");

// Register routes
app.use("/admin", adminRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/flagged-attendance", flaggedRoutes);
app.use("/users", userRoutes);
app.use("/flagged-users", flaggedUserRoutes);
app.use("/locations", locationRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Local Express API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
