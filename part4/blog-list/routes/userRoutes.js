const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/", userController.createNew);
userRouter.get("/", userController.getAll);
userRouter.get("/seed", userController.userSeeders);

module.exports = userRouter;
