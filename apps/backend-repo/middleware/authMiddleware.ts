import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

interface ICustomRequest extends Request {
  user?: DecodedIdToken | string;
}

export const authMiddleware = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Unauthorized: No 'Bearer' token provided" });
    return;
  }

  const idToken = authorization.split("Bearer ")[1];
  await auth
    .verifyIdToken(idToken)
    .then((token) => {
      req.user = token;
      next();
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    });
};
