const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/productController");
const { protect, adminAccess } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, adminAccess, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminAccess, deleteProduct)
  .put(protect, adminAccess, updateProduct);

module.exports = router;
