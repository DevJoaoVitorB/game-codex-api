import { ErrorRequestHandler } from 'express';
import { ApiError } from '@/utils/api-error';
import z from 'zod';

export const errorHandlerMiddleware: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next,
) => {
    // 1. ApiError
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            type: error.type,
            message: error.message,
        });
    }

    // 2. ZodError
    if (error instanceof z.ZodError) {
        return res.status(400).json({
            type: 'VALIDATION_ERROR',
            message: 'Validation error',
            errors: z.treeifyError(error),
        });
    }

    // 3. Generic Error
    if (error instanceof Error) {
        console.error(error);
        return res.status(500).json({
            type: 'INTERNAL_ERROR',
            message: error.message || 'Unexpected error',
        });
    }

    // 4. Internal Server Error
    return res.status(500).json({
        type: 'INTERNAL_ERROR',
        message: 'Unexpected error',
    });
};
