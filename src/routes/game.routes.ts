import { Router } from 'express';
import { validateBodyMiddleware } from '@/middlewares';
import { controller, GameCreateSchema, GameUpdateSchema } from '@/modules/game';

const router = Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: List and search games
 *     tags: [Games]
 *     parameters:
 *       - { in: query, name: name, schema: { type: string } }
 *       - { in: query, name: genre, schema: { type: string } }
 *       - { in: query, name: platform, schema: { type: string } }
 *       - { in: query, name: type, schema: { type: string, enum: [PC, CONSOLE, MOBILE] } }
 *       - { in: query, name: studio, schema: { type: string } }
 *       - { in: query, name: classification, schema: { type: string, example: '18' } }
 *       - { in: query, name: releaseDate, schema: { type: string, format: date } }
 *     responses:
 *       200: { description: Games list }
 */
router.get('/', controller.findAll.bind(controller));
router.post('/', validateBodyMiddleware(GameCreateSchema), controller.create.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.patch('/:id', validateBodyMiddleware(GameUpdateSchema), controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export { router as gameRoutes };
