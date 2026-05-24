import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { GenreService } from './genre.service';

export class GenreController {
    constructor(private service: GenreService) {}

    async findAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const genres = await this.service.list();

            return res.status(200).json(genres);
        } catch (error) {
            return next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number() })
                .parse(req.params);
            const genre = await this.service.findById(id);

            return res.status(200).json(genre);
        } catch (error) {
            return next(error);
        }
    }
}
