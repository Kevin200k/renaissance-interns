const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {verifyAdmin} = require("../middlewares/verifyAdmin") // Or adjust middleware paths


const {
  getFlaggedUsers,
  flagUser,
  unflagUser
} = require("../controllers/flaggedUserController");

// Routes for Flagged Users
// router.get("/", verifyToken, verifyAdmin, getFlaggedUsers);
// router.post("/", verifyToken, verifyAdmin, flagUser);
// router.delete("/:id", verifyToken, verifyAdmin, unflagUser);

router.get("/", getFlaggedUsers);
router.post("/", flagUser);
router.delete("/:id",unflagUser);

module.exports = router;
