import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebaseConfig";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { StatusCodes } from "http-status-codes";
import { logger } from "firebase-functions/v2";

interface ICustomRequest extends Request {
    user?: DecodedIdToken | string;
}

export default async function authMiddleware(
    req: ICustomRequest,
    res: Response,
    next: NextFunction,
) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Unauthorized: No 'Bearer' token provided" });
        return;
    }

    const idToken = authorization.split("Bearer ")[1];

    if (
        process.env.FUNCTIONS_EMULATOR ||
        process.env.NODE_ENV === "development"
    ) {
        if (idToken === "test-access-token") {
            logger.info("Using test token in emulator/development mode");
            next();
            return;
        }
    }
    await auth
        .verifyIdToken(idToken)
        .then((token) => {
            req.user = token;
            next();
        })
        .catch((error) => {
            console.error("Error verifying token:", error);
            res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Unauthorized: Invalid token" });
        });
}
