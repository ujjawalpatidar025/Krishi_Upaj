const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const verifyToken = require("../verify.js");
const {
  addMachine,
  updateStatus,
  updateAmount,
  getMachine,
} = require("../Controllers/machine/machine.js");

const router = express.Router();

router.post("/addMachine", addMachine);
router.post("/updateStatus", verifyToken, updateStatus);
router.post("/updateAmount", verifyToken, updateAmount);
router.post("/getmachines", verifyToken, getMachine);
module.exports = router;
