import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";
import { StatusCodes } from "http-status-codes";
import { getUserData } from "../repository/userCollection";

export const authController = {
    verifyToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idToken } = req.body;
            const decodedToken = await auth.verifyIdToken(idToken, true);
            const userData = await getUserData(decodedToken.uid);
            res.status(StatusCodes.OK).json({
                message: "User verified successfully!",
                data: userData,
            });
        } catch (error) {
            next(error);
        }
    },
};
