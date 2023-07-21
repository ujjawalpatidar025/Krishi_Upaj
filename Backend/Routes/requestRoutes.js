const express = require("express");
const verifyToken = require("../verify.js");
const { rentrequest } = require("../Controllers/request/request.js");


const router = express.Router();

router.post("/rentrequest", verifyToken, rentrequest);

module.exports = router;
