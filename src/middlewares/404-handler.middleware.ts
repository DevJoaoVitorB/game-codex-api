import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '@/utils/api-error';

export const notFoundMiddleware = (
    _req: Request,
    _res: Response,
    next: NextFunction,
) => {
    next(new ApiError('Route not found', 404, 'NOT_FOUND'));
};
