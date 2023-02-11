const express = require("express");
const {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");
const { protect, adminAccess } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, adminAccess, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminAccess, deleteProduct)
  .put(protect, adminAccess, updateProduct);

module.exports = router;
