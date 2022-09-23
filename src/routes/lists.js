import express from 'express';
import {
  createList, getAllLists, deleteList, addItemToList,
} from '../useCases/lists/index.js';

const router = express.Router();

/**
 * @openapi
 * components:
 *  schemas:
 *    getAllListsResult:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *          iconName:
 *            type: string
 *          itemCount:
 *            type: number
 */

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
 *                $ref: "#/components/schemas/getAllListsResult"
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
 *        description: 'Create List Model'
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/createListRequestModel"
 *      responses:
 *        200:
 *          description: The newly created list id.
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: "#/components/schemas/createListResponseModel"
 *        409:
 *          description: Conflict. A list with that name already exists.
 *        5XX:
 *          description: Unexpected Error.
 */
router.post('/', (req, res) => {
  const result = createList(req.body);
  res.send(result);
});

// Delete list
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  deleteList(id);
  res.sendStatus(200);
});

// Add New Item to List.
router.post('/:id/items', (req, res) => {
  const { id } = req.params;
  const result = addItemToList(id, req.body);
  res.send(result);
});

export default router;
