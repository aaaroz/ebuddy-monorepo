import { Router } from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";

const router = Router();

router.use("/users", userRouter).use("/auth", authRouter);

export default router;
