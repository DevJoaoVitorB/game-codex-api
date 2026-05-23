import { Router } from 'express';
import { validateBodyMiddleware } from '@/middlewares';
import { controller } from '@/modules/country';
import {
    CountryCreateSchema,
    CountryUpdateSchema,
} from '@/modules/country/country.schema';

const router = Router();

router.post(
    '/',
    validateBodyMiddleware(CountryCreateSchema),
    controller.create.bind(controller),
);
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.patch(
    '/:id',
    validateBodyMiddleware(CountryUpdateSchema),
    controller.update.bind(controller),
);
router.delete('/:id', controller.remove.bind(controller));

export { router as countryRoutes };
