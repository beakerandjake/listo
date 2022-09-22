import { getLists } from './sqliteListsRepository.js';

// could add dynamic repository here based on config.

const listRepository = {
  getLists,
};

export {
  listRepository,
};
