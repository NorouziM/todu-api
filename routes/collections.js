// packages
import { Router } from 'express';
// controllers
import {
  createCollection,
  updateCollection,
  getCollections,
  deleteCollection,
  getSingleCollection,
} from '../controllers/collections.js';
// middleware
import authGuard from '../middleware/authGuard.js';

const router = Router();

router
  .route('/')
  .post(authGuard, createCollection)
  .get(authGuard, getCollections);
router
  .route('/:id')
  .get(authGuard, getSingleCollection)
  .put(authGuard, updateCollection)
  .delete(authGuard, deleteCollection);

export default router;
