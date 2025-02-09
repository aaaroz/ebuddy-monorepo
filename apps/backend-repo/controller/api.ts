import { Request, Response } from "express";
import { getUsers, updateUser } from "../repository/userCollection";
import { TUser, userSchema } from "entities";

export const apiController = {
    updateUser: async (req: Request, res: Response) => {
        const userData = req.body as TUser;
        userSchema.parse(userData)
        try {
            await updateUser(userData.id, userData);
            res.status(200).json({
                message: "User updated successfully!",
                data: { uid: userData.id, email: userData.email },
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
    getUsers: async (req: Request, res: Response) => {
        try {
            const { limit = 10, lastUserId } = req.query
            const parsedLimit = parseInt(limit as string, 10);
            if (isNaN(parsedLimit) || parsedLimit <= 0) {
                res.status(400).json({ message: 'Invalid limit parameter' });
                return
            }
            const userRecord = await getUsers(parsedLimit, lastUserId as string);
            res.status(200).json({
                message: "User collection fetched successfully!",
                data: userRecord,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },
};
