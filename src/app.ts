import express, { Request, Response } from 'express';

export const createApp = () => {
    const app = express();

    app.use(express.json());

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).json({ message: '🚀 API is running' });
    });

    return app;
};
