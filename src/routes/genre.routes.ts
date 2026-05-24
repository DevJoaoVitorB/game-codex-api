import { Router } from 'express';
import { controller } from '@/modules/genre';

const router = Router();

router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));

export { router as genreRoutes };
