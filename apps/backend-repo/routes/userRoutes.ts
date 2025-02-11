import express from "express";
import { apiController } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter
    .post("/", apiController.createUser)
    .get("/", authMiddleware, apiController.getUsers)
    .put("/update-user-data", authMiddleware, apiController.updateUser)
    .get("/fetch-user-data", authMiddleware, apiController.getUserData);

export default userRouter;
