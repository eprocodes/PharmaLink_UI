const express = require("express");
const { auth, isPharmacist } = require("../middleware/auth");
const {
  getAllOrders,
  getCustomerOrder,
  getOrderByStatus,
  getOrderByMedicine,
  getOrderItem,
  getTotalOrders,
  getCustomerOrderHistory,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.use(auth);
router.use(isPharmacist);

router.get("/all", getAllOrders);
router.get("/customer/:customerId", getCustomerOrder);
router.get("/order-status", getOrderByStatus);
router.get("/search-medicine", getOrderByMedicine);
router.get("/order-items/:id", getOrderItem);
router.get("/total", getTotalOrders);
router.get("/:customerId/history", getCustomerOrderHistory);
router.post("/", createOrder);
router.put("/:id", updateOrder);

//router.get("/refills/pending", getPendingRefillRequests);
//router.put("/refills/:prescriptionId", handleRefillRequest); 

module.exports = router;
