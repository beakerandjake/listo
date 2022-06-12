import express from 'express';
import items from './items.js';

const router = express.Router();

// add routes here.
router.use('/items', items);

export default router;
