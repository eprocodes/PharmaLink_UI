const express = require("express");
const router = express.Router();
const { login, createPharmacy, changePassword, forgotPassword, resetPassword } = require("../controllers/authController");
const { auth, isAdmin } = require("../middleware/auth");

router.post("/login", login); 
router.post("/create-pharmacy", auth, isAdmin, createPharmacy); // only admin can register a new pharmacy
router.put("/change-password", auth, changePassword); 
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
