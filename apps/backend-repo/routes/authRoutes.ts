import express from "express";
import { authController } from "../controller/auth";

const authRouter = express.Router();

authRouter.post("/verify", authController.verifyToken);

export default authRouter;
