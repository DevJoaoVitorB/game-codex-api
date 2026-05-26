import { Router } from 'express';
import { controller } from '@/modules/game-studio';
import { validateBodyMiddleware } from '@/middlewares';
import {
    GameStudioCreateSchema,
    GameStudioUpdateSchema,
} from '@/modules/game-studio';

const router = Router();

/**
 * @swagger
 * /studios:
 *   post:
 *     summary: Create a studio
 *     tags:
 *       - Studios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               website:
 *                 type: string
 *                 nullable: true
 *               foundedYear:
 *                 type: integer
 *               countryId:
 *                 type: integer
 *             required: [name, foundedYear, countryId]
 *     responses:
 *       201:
 *         description: Studio created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Data conflict
 */
router.post(
    '/',
    validateBodyMiddleware(GameStudioCreateSchema),
    controller.create.bind(controller),
);

/**
 * @swagger
 * /studios:
 *   get:
 *     summary: List studios
 *     tags:
 *       - Studios
 *     parameters:
 *       - in: query
 *         name: foundedYear
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: Filter by founded year (repeatable parameter).
 *         explode: true
 *       - in: query
 *         name: countryId
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: Filter by country (repeatable parameter).
 *         explode: true
 *       - in: query
 *         name: country
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         description: Alias for countryId (repeatable parameter).
 *         explode: true
 *     responses:
 *       200:
 *         description: Studios list
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @swagger
 * /studios/{id}:
 *   get:
 *     summary: Get studio by id
 *     tags:
 *       - Studios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Studio found
 *       404:
 *         description: Studio not found
 */
router.get('/:id', controller.findById.bind(controller));

/**
 * @swagger
 * /studios/{id}:
 *   patch:
 *     summary: Update a studio
 *     tags:
 *       - Studios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               website:
 *                 type: string
 *                 nullable: true
 *               foundedYear:
 *                 type: integer
 *               countryId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Studio updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Studio not found
 *       409:
 *         description: Data conflict
 */
router.patch(
    '/:id',
    validateBodyMiddleware(GameStudioUpdateSchema),
    controller.update.bind(controller),
);

/**
 * @swagger
 * /studios/{id}:
 *   delete:
 *     summary: Delete a studio
 *     tags:
 *       - Studios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Studio deleted
 *       404:
 *         description: Studio not found
 */
router.delete('/:id', controller.remove.bind(controller));

export { router as gameStudioRoutes };
