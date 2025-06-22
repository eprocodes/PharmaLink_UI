const express = require("express");
const { auth, isPharmacist } = require("../middleware/auth");
const {
  getAllCustomers,
  getCustomerById,
  getTotalCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer } = require("../controllers/customerController");

const router = express.Router();

router.use(auth);
router.use(isPharmacist);

router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.get("/total", getTotalCustomers);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;
