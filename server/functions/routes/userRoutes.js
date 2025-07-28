const express = require("express");
const router = express.Router();
const { setUserRole, getAllUsers } = require("../controllers/userController");
const { verifyAdmin } = require("../middlewares/auth");

router.post("/set-role", verifyAdmin, setUserRole);
router.get("/", verifyAdmin, getAllUsers);

module.exports = router;
