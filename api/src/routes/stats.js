import express from 'express';
import { getItemCounts, getAverageItemCompletionTime } from '../useCases/stats/index.js';

const router = express.Router();

/**
 * @openapi
 * /api/stats/item-counts:
 *    get:
 *      tags: [Stats]
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
 * /api/stats/avg-completion-time:
 *    get:
 *      tags: [Stats]
 *      summary: Get Average Item Completion Time
 *      description: Average amount of time to mark an item as completed across all lists.
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: "#/components/schemas/averageItemCompletionTime"
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/avg-completion-time', (req, res) => {
  const results = getAverageItemCompletionTime();
  res.send(results);
});

export default router;
