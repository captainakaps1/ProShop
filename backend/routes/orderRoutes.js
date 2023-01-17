const express = require("express");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} = require("../controllers/orderController");
const { protect, adminAccess } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, adminAccess, getAllOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, adminAccess, updateOrderToDelivered);

module.exports = router;
