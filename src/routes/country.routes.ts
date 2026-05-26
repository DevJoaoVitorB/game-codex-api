import { Router } from 'express';
import { controller } from '@/modules/country';

const router = Router();

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: List countries
 *     tags:
 *       - Countries
 *     parameters:
 *       - in: query
 *         name: continent
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [AFRICA, EUROPE, ASIA, OCEANIA, ANTARCTICA, NORTH_AMERICA, SOUTH_AMERICA]
 *         description: Filter by continent (repeatable parameter).
 *         explode: true
 *     responses:
 *       200:
 *         description: Countries list
 */
router.get('/', controller.findAll.bind(controller));

/**
 * @swagger
 * /countries/{id}:
 *   get:
 *     summary: Get country by id
 *     tags:
 *       - Countries
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Country found
 *       404:
 *         description: Country not found
 */
router.get('/:id', controller.findById.bind(controller));

export { router as countryRoutes };
