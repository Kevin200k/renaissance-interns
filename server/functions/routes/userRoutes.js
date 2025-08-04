// const express = require("express");
// const router = express.Router();

// const {
//   setUserRole,
//   getAllUsers,
//   getUserById,
//   suspendUser,
// } = require("../controllers/userController");

// const { verifyAdmin } = require("../middlewares/auth");

// router.post("/set-role", verifyAdmin, setUserRole);
// router.get("/", verifyAdmin, getAllUsers);
// router.get("/:id", verifyAdmin, getUserById);
// router.post("/:id/suspend", verifyAdmin, suspendUser);

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  setUserRole,
  getAllUsers,
  getUserById,
  suspendUser,
} = require("../controllers/userController");

// const { verifyAdmin } = require("../middlewares/auth");  // <-- COMMENT OUT THIS LINE

// Remove verifyAdmin for now
router.post("/set-role", setUserRole);
router.get("/", getAllUsers);  // <-- This is your /users route (REMOVE verifyAdmin here)
router.get("/:id", getUserById);
router.post("/:id/suspend", suspendUser);

module.exports = router;
