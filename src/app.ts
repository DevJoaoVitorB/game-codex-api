import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {
    loggerMiddleware,
    notFoundMiddleware,
    errorHandlerMiddleware,
} from '@/middlewares';
import { countryRoutes, genreRoutes, platformRoutes } from '@/routes';

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: '*',
            credentials: true,
        }),
    );
    app.use(express.json());
    app.use(loggerMiddleware);

    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({ message: '🚀 API is running' });
    });

    app.use('/countries', countryRoutes);
    app.use('/genres', genreRoutes);
    app.use('/platforms', platformRoutes);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    return app;
};
