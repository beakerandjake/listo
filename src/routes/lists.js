import express from 'express';
import {
  createList, getAllLists, deleteList, addItemToList,
} from '../useCases/lists/index.js';

const router = express.Router();

/**
 * @openapi
 * /lists:
 *    get:
 *      tags: [Lists]
 *      summary: Get all Lists
 *      description: Returns all of the Lists.
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          description: An array containing the lists.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/listModel"
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/', (req, res) => {
  const results = getAllLists();
  res.send(results);
});

/**
 * @openapi
 * /lists:
 *    post:
 *      tags: [Lists]
 *      summary: Create List
 *      description: Create a new List.
 *      produces:
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/createListRequestModel"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: "#/components/schemas/createListModel"
 *        409:
 *          description: Conflict. A list with that name already exists.
 *        5XX:
 *          description: Unexpected Error.
 */
router.post('/', (req, res) => {
  const result = createList(req.body);
  res.send(result);
});

/**
 * @openapi
 * /lists/{listId}:
 *    delete:
 *      tags: [Lists]
 *      summary: Delete List
 *      description: Delete the specified list and all its items.
 *      parameters:
 *        - name: listId
 *          in: path
 *          required: true
 *          schema:
 *            type: number
 *      responses:
 *        200:
 *          description: List successfully deleted.
 *        404:
 *          description: List was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteList(id);
  res.sendStatus(200);
});

/**
 * @openapi
 * /lists/{listId}/items:
 *    post:
 *      tags: [Lists]
 *      summary: Add Item
 *      description: Add a new Item to the list.
 *      produces:
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/createItemRequestModel"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: "#/components/schemas/itemModel"
 *        400:
 *          description: Bad Request. Provided invalid parameters.
 *        404:
 *          description: Not Found. A list with that Id was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.post('/:id/items', (req, res) => {
  const { id } = req.params;
  const result = addItemToList(id, req.body);
  res.send(result);
});

export default router;
