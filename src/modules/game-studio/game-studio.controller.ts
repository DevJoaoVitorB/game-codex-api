import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { GameStudioService } from './game-studio.service';
import { GameStudioSearchFiltersSchema } from './game-studio.schema';

export class GameStudioController {
    constructor(private service: GameStudioService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const studio = await this.service.create(req.body);

            return res.status(201).json(studio);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const foundedYearQuery = req.query.foundedYear;
            const countryQuery = req.query.country ?? req.query.countryId;
            const filters = GameStudioSearchFiltersSchema.parse({
                foundedYear: Array.isArray(foundedYearQuery)
                    ? foundedYearQuery
                    : typeof foundedYearQuery === 'string'
                      ? [foundedYearQuery]
                      : undefined,
                countryId: Array.isArray(countryQuery)
                    ? countryQuery
                    : typeof countryQuery === 'string'
                      ? [countryQuery]
                      : undefined,
            });

            const studios = await this.service.list(filters);

            return res.status(200).json(studios);
        } catch (error) {
            return next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number() })
                .parse(req.params);
            const studio = await this.service.findById(id);

            return res.status(200).json(studio);
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number() })
                .parse(req.params);
            const studio = await this.service.update(id, req.body);

            return res.status(200).json(studio);
        } catch (error) {
            return next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number() })
                .parse(req.params);

            await this.service.remove(id);

            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }
}
