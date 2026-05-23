import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { CountryService } from './country.service';
import {
    CountryCreateSchema,
    CountrySearchFiltersSchema,
    CountryUpdateSchema,
} from './country.schema';

export class CountryController {
    constructor(private service: CountryService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = CountryCreateSchema.parse(req.body);
            const country = await this.service.create(data);

            return res.status(201).json(country);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const filters = CountrySearchFiltersSchema.parse({
                continent:
                    typeof req.query.continent === 'string'
                        ? req.query.continent
                        : undefined,
            });

            const countries = await this.service.findAll(filters);

            return res.status(200).json(countries);
        } catch (error) {
            return next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number() })
                .parse(req.params);
            const country = await this.service.findById(id);

            return res.status(200).json(country);
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number() })
                .parse(req.params);
            const data = CountryUpdateSchema.parse(req.body);
            const country = await this.service.update(id, data);

            return res.status(200).json(country);
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
