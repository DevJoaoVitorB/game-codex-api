import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import {
    loggerMiddleware,
    notFoundMiddleware,
    errorHandlerMiddleware,
} from '@/middlewares';
import { countryRoutes, gameStudioRoutes, genreRoutes, platformRoutes } from '@/routes';
import { swaggerSpec } from '@/docs/swagger';

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

    app.get('/', (_req: Request, res: Response) => {
        res.status(200).json({ message: '🚀 API is running' });
    });

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use('/countries', countryRoutes);
    app.use('/genres', genreRoutes);
    app.use('/platforms', platformRoutes);
    app.use('/studios', gameStudioRoutes);

    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);

    return app;
};
