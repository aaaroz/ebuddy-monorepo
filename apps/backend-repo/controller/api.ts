import { Request, Response } from "express";
import { createUser, getUsers } from "../repository/userCollection";

export const apiController = {
  createUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const userRecord = await createUser(email, password);
      res.status(201).json({
        message: "User created successfully!",
        data: { uid: userRecord.uid, email: userRecord.email },
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  getUsers: async (_: Request, res: Response) => {
    try {
      const userRecord = await getUsers();
      res.status(200).json({
        message: "User collection fetched successfully!",
        data: userRecord,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
