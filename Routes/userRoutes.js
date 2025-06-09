const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/userControllers");
const authMiddleware = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, userController.createUser);
router.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  userController.deleteUser
);

module.exports = router;
