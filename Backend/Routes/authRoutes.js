const express = require("express");
const {
  signup,
  signin,
  isAuthenticated,
  updateUser,
} = require("../Controllers/auth/auth.js");
const verifyToken = require("../verify.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/isAuthenticated", verifyToken, isAuthenticated);
router.post("/updateUser", verifyToken, updateUser);

module.exports = router;
