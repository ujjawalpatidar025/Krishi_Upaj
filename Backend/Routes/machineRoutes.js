const express = require("express");

const verifyToken = require("../verify.js");
const { addMachine, updateStatus, updateAmount } = require("../Controllers/machine/machine.js");

const router = express.Router();

router.post("/addMachine", verifyToken, addMachine);
router.post("/updateStatus", verifyToken, updateStatus);
router.post("/updateAmount", verifyToken, updateAmount);

module.exports = router;
