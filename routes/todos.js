// packages
import { Router } from 'express';
// controllers
import {
  createTodo,
  getTodos,
  getUserTodos,
  updateTodo,
  deleteTodo,
  getCollectionTodos,
} from '../controllers/todos.js';
// middleware
import { advancedResults } from '../middleware/advancedResults.js';
import authGuard from '../middleware/authGuard.js';
import adminGuard from '../middleware/adminGuard.js';
// models
import Todo from '../models/Todo.js';

const router = Router();

router
  .route('/')
  .post(authGuard, createTodo)
  .get(authGuard, adminGuard, advancedResults(Todo), getTodos);

router.route('/user').get(authGuard, advancedResults(Todo), getUserTodos);

router
  .route('/:id')
  .delete(authGuard, deleteTodo)
  .put(authGuard, updateTodo)
  .get(authGuard, getCollectionTodos);

export default router;
