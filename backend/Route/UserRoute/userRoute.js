
const express = require("express");
const userRouter = express.Router();
const {signup,login}= require("../../Controller/User/user");

userRouter.post("/registerUser",signup);
userRouter.post("/loginUser",login);

module.exports = userRouter;







