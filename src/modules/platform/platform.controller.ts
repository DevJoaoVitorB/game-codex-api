import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { PlatformService } from './platform.service';
import { PlatformSearchFiltersSchema } from './platform.schema';

export class PlatformController {
    constructor(private service: PlatformService) {}

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const typeQuery = req.query.type;
            const filters = PlatformSearchFiltersSchema.parse({
                type: Array.isArray(typeQuery)
                    ? typeQuery
                    : typeof typeQuery === 'string'
                      ? [typeQuery]
                      : undefined,
            });

            const platforms = await this.service.list(filters);

            return res.status(200).json(platforms);
        } catch (error) {
            return next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = z
                .object({ id: z.coerce.number() })
                .parse(req.params);
            const platform = await this.service.findById(id);

            return res.status(200).json(platform);
        } catch (error) {
            return next(error);
        }
    }
}
