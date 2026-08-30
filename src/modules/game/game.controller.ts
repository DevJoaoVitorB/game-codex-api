import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { GameSearchFiltersSchema } from './game.schema';
import { GameService } from './game.service';

const asArray = (value: unknown) =>
    Array.isArray(value)
        ? value
        : typeof value === 'string'
          ? [value]
          : undefined;

export class GameController {
    constructor(private service: GameService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            return res.status(201).json(await this.service.create(req.body));
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = GameSearchFiltersSchema.parse({
                name: req.query.name,
                genre: asArray(req.query.genre),
                platform: asArray(req.query.platform),
                type: asArray(req.query.type),
                studio: asArray(req.query.studio),
                classification: asArray(req.query.classification),
                releaseDate: asArray(req.query.releaseDate),
            });

            return res.status(200).json(await this.service.list(filters));
        } catch (error) {
            return next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number().int().positive() })
                .parse(req.params);
            return res.status(200).json(await this.service.findById(id));
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number().int().positive() })
                .parse(req.params);
            return res
                .status(200)
                .json(await this.service.update(id, req.body));
        } catch (error) {
            return next(error);
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number().int().positive() })
                .parse(req.params);
            await this.service.remove(id);
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }
}
