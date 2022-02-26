import { Router } from "express";
import Todo from "../models/Todo.js";
import {
  createTodo,
  getTodos,
  getUserTodos,
  updateTodo,
} from "../controllers/todos.js";
import { advancedResults } from "../middleware/advancedResults.js";
import authGuard from "../middleware/authGuard.js";
import adminGuard from "../middleware/adminGuard.js";

const router = Router();

router
  .route("/")
  .post(authGuard, createTodo)
  .get(authGuard, adminGuard, advancedResults(Todo), getTodos);
router.route("/user/:id").put(authGuard, updateTodo);

router.route("/user").get(authGuard, advancedResults(Todo), getUserTodos);

export default router;
