import express from 'express';
import items from './items.js';
import lists from './lists.js';
import stats from './stats.js';

const router = express.Router();

// add routes here.
router.use('/items', items);
router.use('/lists', lists);
router.use('/stats', stats);

export default router;
