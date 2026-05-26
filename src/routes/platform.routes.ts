import { Router } from 'express';
import { controller } from '@/modules/platform';

const router = Router();

/**
 * @swagger
 * /platforms:
 *   get:
 *     summary: List platforms
 *     tags:
 *       - Platforms
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [PC, CONSOLE, MOBILE]
 *         description: Filter by type (repeatable parameter).
 *         explode: true
 *     responses:
 *       200:
 *         description: Platforms list
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @swagger
 * /platforms/{id}:
 *   get:
 *     summary: Get platform by id
 *     tags:
 *       - Platforms
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Platform found
 *       404:
 *         description: Platform not found
 */
router.get('/:id', controller.findById.bind(controller));

export { router as platformRoutes };
