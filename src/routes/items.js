import express from 'express';
import { deleteItem } from '../useCases/items/index.js';

const router = express.Router();

/**
 * @openapi
 * /items/{itemId}:
 *    delete:
 *      tags: [Items]
 *      summary: Delete Item
 *      description: Delete the specified item.
 *      parameters:
 *        - name: itemId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/itemIdModel"
 *      responses:
 *        200:
 *          description: Item successfully deleted.
 *        404:
 *          description: Item was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteItem(id);
  res.sendStatus(200);
});

export default router;
