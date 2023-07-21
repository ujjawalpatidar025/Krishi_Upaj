const express = require("express");
const {
  signup,
  signin,
  isAuthenticated,
  updateUser,
  getUser,
} = require("../Controllers/auth/auth.js");
const verifyToken = require("../verify.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/isAuthenticated", verifyToken, isAuthenticated);
router.post("/updateUser", verifyToken, updateUser);
router.post("/getUser", verifyToken, getUser);

module.exports = router;
