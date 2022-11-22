import { ApplicationError, NotFoundError } from '../../errors/index.js';
import { logger } from '../../logger.js';
import { createItemRequestModel, itemModel } from '../../models/index.js';
import { itemRepository, listRepository } from '../../repositories/index.js';

/**
 * Increments the items quantity by 1.
 * @param {number} id - The id of the item to edit
 */
const incrementItemQuantity = (id) => {
  logger.info('item already exists with name, incrementing quantity');

  const updateCount = itemRepository.incrementQuantity(id, 1);

  if (updateCount !== 1) {
    throw new ApplicationError('Error incrementing quantity of existing item');
  }

  logger.info('incremented quantity item: %d', id);
};

/**
 * Creates an item from the given model.
 * @param {object} addModel - The item to create
 * @returns {number}
 */
const createItem = (addModel) => {
  logger.info('item does not exist with name, inserting new item');

  const itemId = itemRepository.createItem(addModel);

  logger.info('created item: %d for list: %d', itemId, addModel.listId);

  return itemId;
};

/**
 * Creates a new Item.
 * @param {number} listId - The id of the list to add Items to.
 * @param {object} item - The item to create.
 * @returns {object}
 */
export const createOrUpdateItem = (listId, item) => {
  logger.info('upserting item: %s for list: %s', item, listId);

  const addModel = createItemRequestModel({ listId, ...item });

  if (!listRepository.existsWithId(addModel.listId)) {
    throw new NotFoundError('List does not exist');
  }

  // see if an item already exists in this list with this name
  let itemId = itemRepository.findByName(addModel.listId, addModel.name);

  if (itemId) {
    incrementItemQuantity(itemId);
  } else {
    itemId = createItem(addModel);
  }

  return itemModel(itemRepository.getItem(itemId));
};
