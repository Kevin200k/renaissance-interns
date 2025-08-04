const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../middlewares/verifyToken");
// const { verifyAdmin } = require("../middlewares/verifyAdmin");

const {
  getLocations,
  addLocation,
  deleteLocation
} = require("../controllers/locationController");

router.get("/",  getLocations);
router.post("/", addLocation);
router.delete("/:id",deleteLocation);

// router.get("/", verifyToken, verifyAdmin, getLocations);
// router.post("/", verifyToken, verifyAdmin, addLocation);
// router.delete("/:id", verifyToken, verifyAdmin, deleteLocation);

module.exports = router;
