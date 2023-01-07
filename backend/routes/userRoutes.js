const express = require("express");
const {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const { protect, adminAccess } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(createUser).get(protect, adminAccess, getUsers);
router.route("/:id").delete(protect, adminAccess, deleteUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
