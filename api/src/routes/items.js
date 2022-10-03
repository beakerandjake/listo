import express from 'express';
import { deleteItem, editItem } from '../useCases/items/index.js';

const router = express.Router();

/**
 * @openapi
 * /api/items/{itemId}:
 *    delete:
 *      tags: [Items]
 *      summary: Delete Item
 *      description: Delete the specified item.
 *      parameters:
 *        - name: itemId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/itemId"
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

/**
 * @openapi
 * /api/items/{itemId}:
 *    patch:
 *      tags: [Items]
 *      summary: Edit Item
 *      description: Edit one or more fields of the item.
 *      parameters:
 *        - name: itemId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/itemId"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#components/schemas/editItemModel"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/itemModel"
 *        404:
 *          description: Item was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const result = editItem(id, req.body);
  res.send(result);
});

export default router;
