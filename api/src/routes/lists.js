import express from 'express';
import {
  deleteItems,
  getAllItemsInList,
  editItems,
  createOrUpdateItem,
} from '../useCases/items/index.js';
import {
  createList,
  getAllLists,
  deleteList,
  getList,
  editList,
} from '../useCases/lists/index.js';

const router = express.Router();

/**
 * @openapi
 * /api/lists:
 *    get:
 *      tags: [Lists]
 *      summary: Get all Lists
 *      description: Returns all of the Lists.
 *      produces:
 *        - application/json
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/listModel"
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/', (req, res) => {
  const results = getAllLists();
  res.send(results);
});

/**
 * @openapi
 * /api/lists:
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
 *              $ref: "#/components/schemas/createListModel"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: "#/components/schemas/listModel"
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
 * /api/lists/{listId}:
 *    get:
 *      tags: [Lists]
 *      summary: Get List
 *      description: Get the specified list.
 *      parameters:
 *        - name: listId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/listIdModel"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: "#/components/schemas/listModel"
 *        404:
 *          description: List was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = getList(id);
  res.send(result);
});

/**
* @openapi
* /api/lists/{listId}:
*    patch:
*      tags: [Lists]
*      summary: Edit List
*      description: Edit one or more fields of the List.
*      parameters:
*        - name: listId
*          in: path
*          required: true
*          schema:
*            $ref: "#/components/schemas/listIdModel"
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: "#components/schemas/editListModel"
*      responses:
*        200:
*          content:
*            application/json:
*              schema:
*                $ref: "#/components/schemas/listModel"
*        404:
*          description: List was not found.
*        409:
*          description: Conflict. A list with that name already exists.
*        5XX:
*          description: Unexpected Error.
*/
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const result = editList(id, req.body);
  res.send(result);
});

/**
 * @openapi
 * /api/lists/{listId}:
 *    delete:
 *      tags: [Lists]
 *      summary: Delete List
 *      description: Delete the specified list and all its items.
 *      parameters:
 *        - name: listId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/listIdModel"
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
 * /api/lists/{listId}/items:
 *    post:
 *      tags: [Items]
 *      summary: Add Item to List.
 *      description: Add a new Item to the list, if an item already exists with similar name, the quantity of the existing item is updated instead.
 *      parameters:
 *        - name: listId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/listIdModel"
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
  const result = createOrUpdateItem(id, req.body);
  res.send(result);
});

/**
 * @openapi
 * /api/lists/{listId}/items:
 *    get:
 *      tags: [Items]
 *      summary: Get all Items in List
 *      description: Returns all of the Items in the List.
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: listId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/listIdModel"
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/itemModel"
 *        404:
 *          description: Not Found. A list with that Id was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.get('/:id/items', (req, res) => {
  const { id } = req.params;
  const result = getAllItemsInList(id);
  res.send(result);
});

/**
 * @openapi
 * /api/lists/{listId}/items:
 *    delete:
 *      tags: [Items]
 *      summary: Bulk Delete List Items
 *      description: Bulk delete the items in a list.
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: listId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/listIdModel"
 *        - name: filter
 *          in: query
 *          required: false
 *          schema:
 *            $ref: "#/components/schemas/deleteItemsFilter"
 *      responses:
 *        200:
 *          description: Items were successfully deleted.
 *        404:
 *          description: Not Found. A list with that Id was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.delete('/:id/items', (req, res) => {
  const { id } = req.params;
  const { filter } = req.query;
  deleteItems(id, filter);
  res.sendStatus(200);
});

/**
 * @openapi
 * /api/lists/{listId}/items:
 *    patch:
 *      tags: [Items]
 *      summary: Bulk Edit List Items
 *      description: Bulk Edit the items in a list.
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: listId
 *          in: path
 *          required: true
 *          schema:
 *            $ref: "#/components/schemas/listIdModel"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/editItemsModel"
 *      responses:
 *        200:
 *          description: Items were successfully edited.
 *        404:
 *          description: Not Found. A list with that Id was not found.
 *        5XX:
 *          description: Unexpected Error.
 */
router.patch('/:id/items', (req, res) => {
  editItems(req.params.id, req.body);
  res.sendStatus(200);
});

export default router;
