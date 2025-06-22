const express = require("express");
const { auth, isPharmacist } = require("../middleware/auth");
const {
  getAllMedications,
  getMedicationById,
  getMedicationByName,
  addNewMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicationController");

const router = express.Router();

router.use(auth);
router.use(isPharmacist);

router.get("/", getAllMedications); 
router.get("/:id", getMedicationById);
router.get("/search", getMedicationByName);
router.post("/", addNewMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

module.exports = router;
