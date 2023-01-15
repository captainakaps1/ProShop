const express = require("express");
const {
  authUser,
  getUserProfile,
  createUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const { protect, adminAccess } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(createUser).get(protect, adminAccess, getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, adminAccess, deleteUser)
  .get(protect, adminAccess, getUserById)
  .put(protect, adminAccess, updateUserById);
router.route("/login").post(authUser);

module.exports = router;
