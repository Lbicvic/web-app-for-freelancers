const express = require("express");
const UserController = require("../controllers/userController");
const AuthMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/login", UserController.loginUser);

userRouter.post("/register", UserController.registerUser);

userRouter.get(
  "/getCurrentUser",
  AuthMiddleware.requireAuth,
  UserController.getCurrentUser
);

userRouter.post(
  "/getUser",
  AuthMiddleware.requireAuth,
  UserController.getUserById
);

module.exports = userRouter;
