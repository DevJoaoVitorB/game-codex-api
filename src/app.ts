import express, { Request, Response } from 'express';
import {
    loggerMiddleware,
    notFoundMiddleware,
    errorHandlerMiddleware,
} from '@/middlewares';
import { countryRoutes } from '@/routes';

export const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(loggerMiddleware);

    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({ message: '🚀 API is running' });
    });

    app.use('/countries', countryRoutes);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    return app;
};
