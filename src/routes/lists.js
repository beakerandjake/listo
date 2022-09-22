import express from 'express';
import { listRepository } from '../repositories/index.js';
// import { body } from 'express-validator';
// import { validateRequest } from '../middleware/validateRequest.js';
// import { getDb } from '../persistence/sqlite2.js';

const router = express.Router();

// Get all lists.
router.get('/', (req, res) => {
  const results = listRepository.getLists();
  res.send(results);
});

// // Create list
// router.post(
//   '/',
//   validateRequest([
//     body('name').isLength({ min: 3, max: 50 }).trim().escape(),
//     body('iconName').isLength({ min: 3, max: 50 }).trim().escape(),
//   ]),
//   (req, res) => {
//     console.log('posted', req);

//     res.sendStatus(200);
//   },
// );

export default router;
