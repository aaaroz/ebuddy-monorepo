import type { TGenericResponse } from "../entities/types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export default async function errorMiddleware(
    error: unknown,
    _: Request,
    res: Response<TGenericResponse<String, unknown>>,
    next: NextFunction,
) {
    if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: { message: string }) => ({
            message: issue.message,
        }));
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid data", data: errorMessages });
        return
    }
    if (error instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
        return
    }
    if (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            message: "Not found",
        });
        return
    }

    next();
};
