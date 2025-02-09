import type { TGenericResponse } from '../entities/types'
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (
    error: unknown,
    _: Request,
    res: Response<TGenericResponse<String, Error>>,
    next: NextFunction
) => {
    if (error instanceof Error) {
        res.status(500).json({
            message: error.message,
        });
        return
    }
    if (error instanceof ZodError) {
        res.status(400).json({
            message: error.errors[0].message,
        });
        return
    }
    if (error) {
        res.status(404).json({
            message: "Not found",
        });
        return
    }
    next(error);
}
