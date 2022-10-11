import express from 'express';
import { getItemCounts, getItemsDueToday, getOverdueItems } from '../useCases/dashboard/index.js';

const router = express.Router();

/**
 * @openapi
 * /api/dashboard/item-counts:
 *    get:
 *      tags: [Dashboard]
 *      summary: Get Item Counts
 *      description: Stats about the counts of the Items in all Lists.
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: "#/components/schemas/itemCountStats"
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/item-counts', (req, res) => {
  const results = getItemCounts();
  res.send(results);
});

/**
 * @openapi
 * /api/dashboard/due-today:
 *    get:
 *      tags: [Dashboard]
 *      summary: Get Today's Items
 *      description: Get the items that are due today.
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/itemModel"
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/due-today', (req, res) => {
  const results = getItemsDueToday();
  res.send(results);
});

/**
 * @openapi
 * /api/dashboard/overdue-items:
 *    get:
 *      tags: [Dashboard]
 *      summary: Get Overdue Items
 *      description: Get the items that are currently overdue.
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/itemModel"
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/overdue-items', (req, res) => {
  const results = getOverdueItems();
  res.send(results);
});

export default router;
