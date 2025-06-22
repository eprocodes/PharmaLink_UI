
const express = require("express");
const router = express.Router();
const { sendBroadcast } = require("../controllers/broadcastController");
const { auth, isPharmacist } = require("../middleware/auth");

router.post("/broadcast", auth, isPharmacist, sendBroadcast);

module.exports = router;
