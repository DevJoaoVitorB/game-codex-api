import { Router } from 'express';
import { controller } from '@/modules/genre';

const router = Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: List genres
 *     tags:
 *       - Genres
 *     responses:
 *       200:
 *         description: Genres list
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get genre by id
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Genre found
 *       404:
 *         description: Genre not found
 */
router.get('/:id', controller.findById.bind(controller));

export { router as genreRoutes };
