const express = require("express");
const { auth, isPharmacist } = require("../middleware/auth");
const {getPharmacyProfile, updatePharmacyProfile,
       getPharmacySubscriptionStatus, getStatistics} = require("../controllers/pharmacyController");

const router = express.Router();

router.use(auth);

router.get("/profile", isPharmacist, getPharmacyProfile);
router.put("/profile", isPharmacist, updatePharmacyProfile);
router.get("/subscription-status", isPharmacist, getPharmacySubscriptionStatus);
router.get("/statistics", isPharmacist, getStatistics);

module.exports = router;
