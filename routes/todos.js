import { Router } from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
} from "../controllers/todos.js";

const router = Router();

router.route("/").post(createTodo).get(getTodos);
router.route("/:id").get(getTodo).put(updateTodo);

export default router;
//
