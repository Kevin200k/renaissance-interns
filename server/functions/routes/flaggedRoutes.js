const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../middlewares/verifyToken");
// const {verifyAdmin} = require("../middlewares/verifyAdmin") // Or adjust middleware paths

const {
  getFlaggedAttendance,
  markReviewed,
  markIgnored
} = require("../controllers/flaggedController");

// router.get("/", verifyToken, verifyAdmin, getFlaggedAttendance);
// router.post("/:id/review", verifyToken, verifyAdmin, markReviewed);
// router.post("/:id/ignore", verifyToken, verifyAdmin, markIgnored);


router.get("/", getFlaggedAttendance);
router.post("/:id/review", markReviewed);
router.post("/:id/ignore", markIgnored);
module.exports = router;
