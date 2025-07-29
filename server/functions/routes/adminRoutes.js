const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyAdmin } = require("../middlewares/verifyAdmin");
const {
  createLocation,
  getLocations
} = require("../controllers/adminController");

router.post("/locations", verifyToken, verifyAdmin, createLocation);
router.get("/locations", verifyToken, verifyAdmin, getLocations);

module.exports = router;
