import express from "express";
import { apiController } from "../controller/api";

const userRouter = express.Router();

userRouter
    .post("/update-user-data", apiController.updateUser)
    .get("/fetch-users-data", apiController.getUsers);

export default userRouter;
