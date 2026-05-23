import type { NextFunction, Request, Response } from 'express';

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const start = process.hrtime.bigint();
    const { method, originalUrl } = req;

    res.on('finish', () => {
        const { statusCode } = res;
        const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

        console.log(
            `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} ${durationMs}ms`,
        );
    });

    next();
};
