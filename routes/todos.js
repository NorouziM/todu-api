import { Router } from "express";
import Todo from "../models/Todo.js";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
} from "../controllers/todos.js";
import { advancedResults } from "../middleware/advancedResults.js";

const router = Router();

router.route("/").post(createTodo).get(advancedResults(Todo), getTodos);
router.route("/:id").get(getTodo).put(updateTodo);

export default router;
//
