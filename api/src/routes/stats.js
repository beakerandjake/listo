import express from 'express';
import { getItemCounts } from '../useCases/stats/index.js';

const router = express.Router();

/**
 * @openapi
 * /api/stats:
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
router.get('/', (req, res) => {
  const results = getItemCounts();
  res.send(results);
});

export default router;
