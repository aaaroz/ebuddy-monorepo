import { NextFunction, Request, Response } from "express";
import {
    createUser,
    getUserData,
    getUsers,
    updateUser,
} from "../repository/userCollection";
import { TUser, userSchema } from "../entities/types";
import { StatusCodes } from "http-status-codes";

export const apiController = {
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = req.body as TUser;
            userSchema.parse(userData);
            await createUser(userData);
            res.status(StatusCodes.CREATED).json({
                message: "User created successfully!",
                data: { userId: userData.id, email: userData.email },
            });
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = req.body as TUser;
            userSchema.parse(userData);
            const updatedUserData = await updateUser(userData);
            res.status(StatusCodes.OK).json({
                message: "User updated successfully!",
                data: updatedUserData,
            });
        } catch (error) {
            next(error);
        }
    },
    getUserData: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.query;
            const userData = await getUserData(userId as string);
            res.status(StatusCodes.OK).json({
                message: "User data fetched successfully!",
                data: userData,
            });
        } catch (error) {
            next(error);
        }
    },
    getUsers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { limit = 10, lastUserId } = req.query;

            const parsedLimit = parseInt(limit as string, 10);

            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                res.status(400).json({ message: "Invalid limit parameter" });
                return;
            }
            const userRecord = await getUsers(parsedLimit, lastUserId as string);
            res.status(StatusCodes.OK).json({
                message: "User collection fetched successfully!",
                data: userRecord,
            });
        } catch (error) {
            next(error);
        }
    },
};
