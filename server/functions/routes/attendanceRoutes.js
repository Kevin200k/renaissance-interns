// server\functions\routes\attendanceRoutes.js

const express = require("express");
const router = express.Router();
const { markAttendance, getHistory } = require("../controllers/attendanceController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/mark", verifyToken, markAttendance);
// router.get("/history", verifyToken, getHistory);

module.exports = router;
