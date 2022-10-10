import express from 'express';
import { getItemCounts } from '../useCases/dashboard/index.js';

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
 * /api/dashboard/today-summary:
 *    get:
 *      tags: [Dashboard]
 *      summary: Get Today Summary
 *      description: Get the items that are due today.
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
router.get('/today-summary', (req, res) => {
  const results = getItemCounts();
  res.send(results);
});

export default router;
