import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { CountryService } from './country.service';
import { CountrySearchFiltersSchema } from './country.schema';

export class CountryController {
    constructor(private service: CountryService) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const continentQuery = req.query.continent;
            const filters = CountrySearchFiltersSchema.parse({
                continent: Array.isArray(continentQuery)
                    ? continentQuery
                    : typeof continentQuery === 'string'
                      ? [continentQuery]
                      : undefined,
            });

            const countries = await this.service.list(filters);

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
}
