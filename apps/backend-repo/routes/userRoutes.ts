import express from "express";
import { apiController } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter
  .post("/update-user-data", authMiddleware, apiController.createUser)
  .get("/fetch-users-data", authMiddleware, apiController.getUsers);

export default userRouter;
