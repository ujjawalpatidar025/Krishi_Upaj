const express = require("express");
const verifyToken = require("../verify.js");
const {
  rentrequest,
  rentaccept,
  getactiverental,
} = require("../Controllers/request/request.js");
const { rentclose } = require("../Controllers/rentclose/rentclose.js");

const router = express.Router();

router.post("/rentrequest", verifyToken, rentrequest);
router.post("/requestaccept", verifyToken, rentaccept);
router.post("/getactiverental", verifyToken, getactiverental);
router.post("/rentclose", verifyToken, rentclose);

module.exports = router;
